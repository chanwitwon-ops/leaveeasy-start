// ─────────────────────────────────────────────────────────────
// js/leave-request-detail.js — หน้าที่ 3 รายละเอียดใบลา
// สัปดาห์ที่ 7: อ่าน/แก้/ลบ ผ่าน Firestore จริง
// ─────────────────────────────────────────────────────────────

(function () {
  var รหัสใบลา = ค่าจากURL("id");
  var กล่องใบลา = document.getElementById("กล่องใบลา");
  var กล่องความเห็น = document.getElementById("กล่องความเห็น");

  var ใบ = null;
  var ความเห็น = [];

  ถ้าพร้อมแล้วให้โหลด();

  // js/firebase.js เป็น module โหลดแยกจากไฟล์นี้ ต้องรอให้มันเชื่อมต่อเสร็จก่อน
  function ถ้าพร้อมแล้วให้โหลด() {
    if (window.db) {
      โหลดข้อมูล();
    } else {
      window.addEventListener("firebase-ready", โหลดข้อมูล, { once: true });
    }
  }

  async function โหลดข้อมูล() {
    try {
      var สแนปช็อตใบลา = await window.fsGetDoc(window.fsDoc(window.db, "leaveRequests", รหัสใบลา));
      if (!สแนปช็อตใบลา.exists()) {
        กล่องใบลา.innerHTML = "<p>ไม่พบใบขอลาที่ต้องการ — อาจถูกลบไปแล้ว หรือลิงก์ไม่ถูกต้อง</p>";
        return;
      }
      ใบ = สแนปช็อตใบลา.data();
      ใบ.id = สแนปช็อตใบลา.id;

      var qความเห็น = window.fsQuery(
        window.fsCollection(window.db, "leaveRequests", รหัสใบลา, "approvals"),
        window.fsOrderBy("createdAt")
      );
      var สแนปช็อตความเห็น = await window.fsGetDocs(qความเห็น);
      ความเห็น = [];
      สแนปช็อตความเห็น.forEach(function (เอกสาร) {
        var ข้อมูล = เอกสาร.data();
        ข้อมูล.id = เอกสาร.id;
        ความเห็น.push(ข้อมูล);
      });

      วาดใบลา();
      วาดความเห็น();
      กล่องความเห็น.classList.remove("hidden");

      document.getElementById("ปุ่มส่งความเห็น").addEventListener("click", ส่งความเห็น);
    } catch (err) {
      กล่องใบลา.innerHTML = "<p>โหลดข้อมูลไม่สำเร็จ: " + esc(err.message) + "</p>";
      console.error(err);
    }
  }

  // ── วาดข้อมูลใบลาลงหน้าจอ ──
  function วาดใบลา() {
    var แถว = [
      ["หัวข้อ", esc(ใบ.title)],
      ["เหตุผลการลา", esc(ใบ.reason)],
      ["ประเภทการลา", esc(ใบ.leaveTypeName)],
      ["วันที่ลา", esc(ใบ.startDate) + " ถึง " + esc(ใบ.endDate)],
      ["ผู้ขอลา", esc(ใบ.requesterName)],
      ["ผู้อนุมัติ", ใบ.approverName ? esc(ใบ.approverName) : "ยังไม่ได้กำหนดผู้อนุมัติ"],
      ["สถานะ", ป้ายสถานะ(ใบ.status)],
      ["วันที่ยื่น", esc(ใบ.createdAt)]
    ];

    var html = แถว.map(function (r) {
      return '<div class="field-row"><span class="k">' + r[0] + "</span><span>" + r[1] + "</span></div>";
    }).join("");

    // ปุ่มอนุมัติ / ไม่อนุมัติ / ลบ ขึ้นเฉพาะใบที่ยังรอพิจารณา
    if (ใบ.status === "รอพิจารณา") {
      html +=
        '<div class="btn-row">' +
        '<button type="button" class="btn-ok" id="ปุ่มอนุมัติ">อนุมัติ</button>' +
        '<button type="button" class="btn-danger" id="ปุ่มไม่อนุมัติ">ไม่อนุมัติ</button>' +
        '<button type="button" class="btn-danger" id="ปุ่มลบ">ลบใบลานี้</button>' +
        "</div>";
    } else {
      html += '<p class="hint">ใบนี้พิจารณาแล้ว จึงเปลี่ยนสถานะต่อไม่ได้</p>';
    }

    กล่องใบลา.innerHTML = html;

    if (ใบ.status === "รอพิจารณา") {
      document.getElementById("ปุ่มอนุมัติ").addEventListener("click", function () { เปลี่ยนสถานะ("อนุมัติ"); });
      document.getElementById("ปุ่มไม่อนุมัติ").addEventListener("click", function () { เปลี่ยนสถานะ("ไม่อนุมัติ"); });
      document.getElementById("ปุ่มลบ").addEventListener("click", ลบใบลา);
    }
  }

  // ── เปลี่ยนสถานะจริงใน Firestore (แก้เฉพาะช่อง status) ──
  async function เปลี่ยนสถานะ(สถานะใหม่) {
    // กฎ: จะไม่อนุมัติได้ ต้องมีความเห็นอย่างน้อย 1 รายการก่อน
    if (สถานะใหม่ === "ไม่อนุมัติ" && ความเห็น.length === 0) {
      alert("ต้องเขียนความเห็นอย่างน้อย 1 รายการก่อน จึงจะกดไม่อนุมัติได้");
      return;
    }
    try {
      await window.fsUpdateDoc(window.fsDoc(window.db, "leaveRequests", ใบ.id), { status: สถานะใหม่ });
      ใบ.status = สถานะใหม่;
      วาดใบลา();
    } catch (err) {
      alert("เปลี่ยนสถานะไม่สำเร็จ: " + err.message);
      console.error(err);
    }
  }

  // ── ลบใบลา (เฉพาะใบที่ยังรอพิจารณา) ──
  async function ลบใบลา() {
    if (!confirm('ยืนยันการลบใบลา "' + ใบ.title + '" หรือไม่ — ลบแล้วกู้คืนไม่ได้')) return;
    try {
      await window.fsDeleteDoc(window.fsDoc(window.db, "leaveRequests", ใบ.id));
      location.href = "leave-requests.html";
    } catch (err) {
      alert("ลบไม่สำเร็จ: " + err.message);
      console.error(err);
    }
  }

  // ── รายการความเห็น เรียงจากเก่าไปใหม่ ──
  function วาดความเห็น() {
    var ที่วาง = document.getElementById("รายการความเห็น");
    if (ความเห็น.length === 0) {
      ที่วาง.innerHTML = "<p>ยังไม่มีความเห็นในใบนี้</p>";
      return;
    }
    ที่วาง.innerHTML = ความเห็น
      .slice()
      .sort(function (a, b) { return a.createdAt < b.createdAt ? -1 : 1; })
      .map(function (c) {
        return '<div class="comment"><div class="meta">' + esc(c.authorName) + " · " + esc(c.createdAt) +
               "</div><div>" + esc(c.message) + "</div></div>";
      }).join("");
  }

  // ── ส่งความเห็นใหม่ลง Firestore (โฟลเดอร์ย่อย approvals) ──
  async function ส่งความเห็น() {
    var ช่อง = document.getElementById("ข้อความความเห็น");
    var เตือน = document.getElementById("เตือนความเห็น");
    var ข้อความ = ช่อง.value.trim();

    if (!ข้อความ) {
      เตือน.textContent = "⚠️ พิมพ์ข้อความก่อน จึงจะส่งความเห็นได้";
      เตือน.classList.remove("hidden");
      return;
    }
    เตือน.classList.add("hidden");

    try {
      // สัปดาห์ที่ 7 ยังไม่มีล็อกอิน จึงสมมติว่าผู้เขียนคือ สมหญิง รักงาน
      // (Section C จะแทนที่ด้วยผู้ใช้ที่ล็อกอินอยู่จริง)
      var ความเห็นใหม่ = {
        authorId: "u002", authorName: "สมหญิง รักงาน",
        message: ข้อความ,
        createdAt: เวลาตอนนี้()
      };
      var เอกสารใหม่ = window.fsDoc(window.db, "leaveRequests", ใบ.id, "approvals", "ap-ใหม่-" + Date.now());
      await window.fsSetDoc(เอกสารใหม่, ความเห็นใหม่);

      ความเห็นใหม่.id = เอกสารใหม่.id;
      ความเห็น.push(ความเห็นใหม่);
      ช่อง.value = "";
      วาดความเห็น();
    } catch (err) {
      เตือน.textContent = "⚠️ ส่งความเห็นไม่สำเร็จ: " + err.message;
      เตือน.classList.remove("hidden");
      console.error(err);
    }
  }
})();
