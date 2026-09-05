// ─────────────────────────────────────────────────────────────
// js/leave-types.js — หน้าที่ 4 จัดการประเภทการลา
// สัปดาห์ที่ 7: เพิ่ม แก้ ลบ จริงบน Firestore (โฟลเดอร์ leaveTypes)
// ─────────────────────────────────────────────────────────────

(function () {
  var รายการ = [];
  var ที่วางตาราง = document.getElementById("ตารางประเภท");
  var ช่องชื่อใหม่ = document.getElementById("ชื่อประเภทใหม่");
  var กล่องเตือน = document.getElementById("เตือนประเภท");

  ถ้าพร้อมแล้วให้โหลด();
  document.getElementById("ปุ่มเพิ่ม").addEventListener("click", เพิ่มประเภท);

  // js/firebase.js เป็น module โหลดแยกจากไฟล์นี้ ต้องรอให้มันเชื่อมต่อเสร็จก่อน
  function ถ้าพร้อมแล้วให้โหลด() {
    if (window.db) {
      โหลดรายการ();
    } else {
      window.addEventListener("firebase-ready", โหลดรายการ, { once: true });
    }
  }

  async function โหลดรายการ() {
    try {
      var สแนปช็อต = await window.fsGetDocs(window.fsCollection(window.db, "leaveTypes"));
      รายการ = [];
      สแนปช็อต.forEach(function (เอกสาร) {
        var ข้อมูล = เอกสาร.data();
        ข้อมูล.id = เอกสาร.id;
        รายการ.push(ข้อมูล);
      });
      วาดตาราง();
    } catch (err) {
      ที่วางตาราง.innerHTML = "<p>โหลดข้อมูลไม่สำเร็จ: " + esc(err.message) + "</p>";
      console.error(err);
    }
  }

  function วาดตาราง() {
    if (รายการ.length === 0) {
      ที่วางตาราง.innerHTML = "<p>ยังไม่มีประเภทการลาในระบบ</p>";
      return;
    }

    var html = "<table><thead><tr><th>ชื่อประเภทการลา</th><th>จัดการ</th></tr></thead><tbody>";
    รายการ.forEach(function (ประเภท) {
      html +=
        "<tr><td>" + esc(ประเภท.name) + "</td><td>" +
        '<button type="button" class="btn-ghost" data-edit="' + esc(ประเภท.id) + '">แก้ไข</button> ' +
        '<button type="button" class="btn-danger" data-del="' + esc(ประเภท.id) + '">ลบ</button>' +
        "</td></tr>";
    });
    html += "</tbody></table>";
    ที่วางตาราง.innerHTML = html;

    ที่วางตาราง.querySelectorAll("[data-edit]").forEach(function (ปุ่ม) {
      ปุ่ม.addEventListener("click", function () { แก้ประเภท(ปุ่ม.dataset.edit); });
    });
    ที่วางตาราง.querySelectorAll("[data-del]").forEach(function (ปุ่ม) {
      ปุ่ม.addEventListener("click", function () { ลบประเภท(ปุ่ม.dataset.del); });
    });
  }

  async function เพิ่มประเภท() {
    var ชื่อ = ช่องชื่อใหม่.value.trim();
    if (!ชื่อ) {
      กล่องเตือน.textContent = "⚠️ พิมพ์ชื่อประเภทการลาก่อน จึงจะเพิ่มได้";
      กล่องเตือน.classList.remove("hidden");
      return;
    }
    กล่องเตือน.classList.add("hidden");

    try {
      var เอกสารใหม่ = window.fsDoc(window.fsCollection(window.db, "leaveTypes"));
      await window.fsSetDoc(เอกสารใหม่, { name: ชื่อ });
      ช่องชื่อใหม่.value = "";
      await โหลดรายการ();
    } catch (err) {
      กล่องเตือน.textContent = "⚠️ เพิ่มไม่สำเร็จ: " + err.message;
      กล่องเตือน.classList.remove("hidden");
      console.error(err);
    }
  }

  async function แก้ประเภท(id) {
    var ประเภท = รายการ.find(function (t) { return t.id === id; });
    var ชื่อใหม่ = prompt("แก้ชื่อประเภทการลา", ประเภท.name);
    if (ชื่อใหม่ === null) return;              // กดยกเลิก
    if (!ชื่อใหม่.trim()) { alert("ชื่อประเภทการลาว่างเปล่าไม่ได้"); return; }

    try {
      await window.fsUpdateDoc(window.fsDoc(window.db, "leaveTypes", id), { name: ชื่อใหม่.trim() });
      await โหลดรายการ();
    } catch (err) {
      alert("แก้ไขไม่สำเร็จ: " + err.message);
      console.error(err);
    }
  }

  async function ลบประเภท(id) {
    var ประเภท = รายการ.find(function (t) { return t.id === id; });
    if (!confirm('ยืนยันการลบประเภท "' + ประเภท.name + '" หรือไม่')) return;

    try {
      await window.fsDeleteDoc(window.fsDoc(window.db, "leaveTypes", id));
      await โหลดรายการ();
    } catch (err) {
      alert("ลบไม่สำเร็จ: " + err.message);
      console.error(err);
    }
  }
})();
