// ─────────────────────────────────────────────────────────────
// js/new-leave-request.js — หน้าที่ 2 ยื่นใบลาใหม่
// สัปดาห์ที่ 7: บันทึกลง Firestore จริง (โฟลเดอร์ leaveRequests)
// ─────────────────────────────────────────────────────────────

(function () {
  var ฟอร์ม = document.getElementById("ฟอร์มใบลา");
  var ช่องประเภท = document.getElementById("leaveTypeId");
  var กล่องเตือน = document.getElementById("ข้อความเตือน");
  var ปุ่มบันทึก = ฟอร์ม.querySelector('button[type="submit"]');

  ถ้าพร้อมแล้วให้โหลด();

  // js/firebase.js เป็น module โหลดแยกจากไฟล์นี้ ต้องรอให้มันเชื่อมต่อเสร็จก่อน
  function ถ้าพร้อมแล้วให้โหลด() {
    if (window.db) {
      โหลดประเภทการลา();
    } else {
      window.addEventListener("firebase-ready", โหลดประเภทการลา, { once: true });
    }
  }

  // เติมรายการเลื่อนลงด้วยประเภทการลาที่มีอยู่จริงใน Firestore
  async function โหลดประเภทการลา() {
    try {
      var สแนปช็อต = await window.fsGetDocs(window.fsCollection(window.db, "leaveTypes"));
      สแนปช็อต.forEach(function (เอกสาร) {
        var ข้อมูล = เอกสาร.data();
        var ตัวเลือก = document.createElement("option");
        ตัวเลือก.value = เอกสาร.id;
        ตัวเลือก.textContent = ข้อมูล.name;
        ช่องประเภท.appendChild(ตัวเลือก);
      });
    } catch (err) {
      เตือน("โหลดประเภทการลาไม่สำเร็จ: " + err.message);
      console.error(err);
    }
  }

  ฟอร์ม.addEventListener("submit", function (e) {
    e.preventDefault();

    var ค่า = {
      title: document.getElementById("title").value.trim(),
      reason: document.getElementById("reason").value.trim(),
      leaveTypeId: ช่องประเภท.value,
      leaveTypeName: ช่องประเภท.options[ช่องประเภท.selectedIndex] ? ช่องประเภท.options[ช่องประเภท.selectedIndex].textContent : "",
      startDate: document.getElementById("startDate").value,
      endDate: document.getElementById("endDate").value
    };

    // ตรวจว่ากรอกครบก่อนบันทึก
    if (!ค่า.title || !ค่า.reason || !ค่า.leaveTypeId || !ค่า.startDate || !ค่า.endDate) {
      เตือน("กรอกไม่ครบ — ต้องกรอกทุกช่องก่อนกดบันทึก");
      return;
    }
    if (ค่า.endDate < ค่า.startDate) {
      เตือน("วันที่สิ้นสุดต้องไม่มาก่อนวันที่เริ่มลา");
      return;
    }

    บันทึกใบลา(ค่า);
  });

  // auth-guard.js ยิง auth-ready หลังรู้ว่าใครล็อกอินอยู่ — รอให้พร้อมก่อนถึงจะรู้ requesterId ที่แท้จริง
  async function ถ้าผู้ใช้พร้อมแล้ว() {
    if (window.CURRENT_USER) return;
    await new Promise(function (resolve) {
      window.addEventListener("auth-ready", resolve, { once: true });
    });
  }

  async function บันทึกใบลา(ค่า) {
    ปุ่มบันทึก.disabled = true;
    try {
      await ถ้าผู้ใช้พร้อมแล้ว();

      var ใบใหม่ = {
        title: ค่า.title,
        reason: ค่า.reason,
        status: "รอพิจารณา",                       // ใบใหม่เริ่มที่ รอพิจารณา เสมอ
        requesterId: window.CURRENT_USER.uid, requesterName: window.CURRENT_USER.name,
        approverId: "",      approverName: "",
        leaveTypeId: ค่า.leaveTypeId, leaveTypeName: ค่า.leaveTypeName,
        startDate: ค่า.startDate,
        endDate: ค่า.endDate,
        createdAt: เวลาตอนนี้()
      };

      var เอกสารใหม่ = window.fsDoc(window.fsCollection(window.db, "leaveRequests"));
      await window.fsSetDoc(เอกสารใหม่, ใบใหม่);

      location.href = "leave-requests.html";
    } catch (err) {
      เตือน("บันทึกไม่สำเร็จ: " + err.message);
      console.error(err);
      ปุ่มบันทึก.disabled = false;
    }
  }

  function เตือน(ข้อความ) {
    กล่องเตือน.textContent = "⚠️ " + ข้อความ;
    กล่องเตือน.classList.remove("hidden");
  }
})();
