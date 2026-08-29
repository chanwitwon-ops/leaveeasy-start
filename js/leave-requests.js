// ─────────────────────────────────────────────────────────────
// js/leave-requests.js — หน้าที่ 1 รายการใบลา
// สัปดาห์ที่ 6: อ่านจาก Firestore จริง (โฟลเดอร์ leaveRequests)
// ─────────────────────────────────────────────────────────────

(function () {
  var กล่อง = document.getElementById("ผลลัพธ์");

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
      var q = window.fsQuery(
        window.fsCollection(window.db, "leaveRequests"),
        window.fsOrderBy("createdAt", "desc")
      );
      var สแนปช็อต = await window.fsGetDocs(q);

      var ใบลาทั้งหมด = [];
      สแนปช็อต.forEach(function (เอกสาร) {
        var ข้อมูล = เอกสาร.data();
        ข้อมูล.id = เอกสาร.id;
        ใบลาทั้งหมด.push(ข้อมูล);
      });

      // ถ้ามีสถานะติดมาท้าย URL ให้กรองเฉพาะสถานะนั้น
      var สถานะที่กรอง = ค่าจากURL("status");
      if (สถานะที่กรอง) {
        ใบลาทั้งหมด = ใบลาทั้งหมด.filter(function (ใบ) { return ใบ.status === สถานะที่กรอง; });
        document.querySelector(".subtitle").textContent =
          "กำลังแสดงเฉพาะใบลาที่สถานะ " + สถานะที่กรอง + " · กดเมนู รายการใบลา เพื่อดูทั้งหมด";
      }

      แสดงตาราง(ใบลาทั้งหมด);
    } catch (err) {
      กล่อง.innerHTML = "<p>โหลดข้อมูลไม่สำเร็จ: " + esc(err.message) + "</p>";
      console.error(err);
    }
  }

  function แสดงตาราง(รายการ) {
    if (รายการ.length === 0) {
      กล่อง.innerHTML = "<p>ยังไม่มีใบขอลาในระบบ</p>";
      return;
    }

    var html =
      "<table><thead><tr>" +
      "<th>หัวข้อ</th>" +
      "<th>ประเภทการลา</th>" +
      "<th>สถานะ</th>" +
      '<th class="hide-mobile">ผู้ขอลา</th>' +
      '<th class="hide-mobile">วันที่ลา</th>' +
      "</tr></thead><tbody>";

    รายการ.forEach(function (ใบ) {
      html +=
        '<tr class="clickable" data-id="' + esc(ใบ.id) + '">' +
        "<td>" + esc(ใบ.title) + "</td>" +
        "<td>" + esc(ใบ.leaveTypeName) + "</td>" +
        "<td>" + ป้ายสถานะ(ใบ.status) + "</td>" +
        '<td class="hide-mobile">' + esc(ใบ.requesterName) + "</td>" +
        '<td class="hide-mobile">' + esc(ใบ.startDate) + " ถึง " + esc(ใบ.endDate) + "</td>" +
        "</tr>";
    });

    html += "</tbody></table>";
    กล่อง.innerHTML = html;

    // กดที่แถวไหน ไปหน้ารายละเอียดของใบนั้น
    กล่อง.querySelectorAll("tr.clickable").forEach(function (แถว) {
      แถว.addEventListener("click", function () {
        location.href = "leave-request-detail.html?id=" + แถว.dataset.id;
      });
    });
  }
})();
