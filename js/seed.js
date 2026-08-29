// ─────────────────────────────────────────────────────────────
// js/seed.js — ใส่ข้อมูลตัวอย่างลง Firestore จริง (รันครั้งเดียว)
// ใช้ข้อมูลชุดเดียวกับ js/data.js ตามหัวข้อ 7 ของ leaveeasy-spec.md
// ─────────────────────────────────────────────────────────────

(function () {
  var ปุ่ม = document.getElementById("ปุ่มซีด");
  var สถานะ = document.getElementById("สถานะซีด");

  ปุ่ม.addEventListener("click", function () {
    ปุ่ม.disabled = true;
    เริ่มซีด();
  });

  async function เริ่มซีด() {
    try {
      แจ้ง("กำลังใส่ users…");
      for (var i = 0; i < window.LEAVE_DATA.users.length; i++) {
        var u = window.LEAVE_DATA.users[i];
        await window.fsSetDoc(window.fsDoc(window.db, "users", u.id), {
          name: u.name, email: u.email, role: u.role
        });
      }

      แจ้ง("กำลังใส่ leaveTypes…");
      for (var j = 0; j < window.LEAVE_DATA.leaveTypes.length; j++) {
        var t = window.LEAVE_DATA.leaveTypes[j];
        await window.fsSetDoc(window.fsDoc(window.db, "leaveTypes", t.id), {
          name: t.name
        });
      }

      แจ้ง("กำลังใส่ leaveRequests…");
      for (var k = 0; k < window.LEAVE_DATA.leaveRequests.length; k++) {
        var lr = window.LEAVE_DATA.leaveRequests[k];
        var ข้อมูลใบลา = {};
        Object.keys(lr).forEach(function (คีย์) {
          if (คีย์ !== "id") ข้อมูลใบลา[คีย์] = lr[คีย์];
        });
        await window.fsSetDoc(window.fsDoc(window.db, "leaveRequests", lr.id), ข้อมูลใบลา);
      }

      แจ้ง("กำลังใส่ approvals (โฟลเดอร์ย่อยของแต่ละใบลา)…");
      for (var m = 0; m < window.LEAVE_DATA.approvals.length; m++) {
        var ap = window.LEAVE_DATA.approvals[m];
        await window.fsSetDoc(
          window.fsDoc(window.db, "leaveRequests", ap.requestId, "approvals", ap.id),
          { authorId: ap.authorId, authorName: ap.authorName, message: ap.message, createdAt: ap.createdAt }
        );
      }

      แจ้ง("✅ ใส่ข้อมูลตัวอย่างสำเร็จ — เปิด Firebase Console ดูได้เลย");
    } catch (err) {
      แจ้ง("❌ ใส่ข้อมูลไม่สำเร็จ: " + err.message);
      console.error(err);
      ปุ่ม.disabled = false;
    }
  }

  function แจ้ง(ข้อความ) {
    สถานะ.textContent = ข้อความ;
  }
})();
