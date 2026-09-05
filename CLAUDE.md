# CLAUDE.md — LeaveEasy

คู่มือสำหรับ Claude Code เวลาเข้ามาทำงานในโปรเจกต์นี้ อ่าน [leaveeasy-spec.md](leaveeasy-spec.md) ก่อนเสมอสำหรับรายละเอียดเต็ม — ไฟล์นี้เป็นสรุปย่อที่ต้องรู้ทันที

## โปรเจกต์นี้คืออะไร

ระบบขอลาออนไลน์ (LeaveEasy) — พนักงานยื่นใบลา → หัวหน้าพิจารณา → อนุมัติ/ไม่อนุมัติ
เขียนด้วย HTML/CSS/JavaScript ธรรมดา ไม่มี framework ไม่มีเซิร์ฟเวอร์ของตัวเอง หน้าเว็บคุยกับ Firestore ตรง ๆ

## โครงสร้างข้อมูล (Firestore)

```
users/           { name, email, role }        role: employee | manager | hr
leaveTypes/       { name }
leaveRequests/    { title, reason, status, requesterId, requesterName,
                    approverId, approverName, leaveTypeId, leaveTypeName,
                    startDate, endDate, createdAt }
   └─ approvals/  { authorId, authorName, message, createdAt }   (subcollection ของแต่ละใบลา)
```

รายละเอียดช่องข้อมูลทั้งหมด: leaveeasy-spec.md หัวข้อ 5

## สถานะใบลา (status) — ใช้ได้ 3 ค่าเท่านั้น

`รอพิจารณา` → `อนุมัติ` หรือ `ไม่อนุมัติ` (ปลายทาง เปลี่ยนต่อไม่ได้ ห้ามย้อนกลับ)
กฎเต็ม: leaveeasy-spec.md หัวข้อ 6

## ข้อห้ามสำคัญของโปรเจกต์

- **ห้ามใส่คีย์ API หรือค่าตั้งค่าลับลงในไฟล์ที่ push ขึ้น GitHub** — ค่าตั้งค่า Firebase จริงเก็บใน `js/firebase-config.js` ซึ่งถูก gitignore ไว้แล้ว ใช้ `js/firebase-config.example.js` เป็นต้นแบบตอน setup เครื่องใหม่ ก่อน push ทุกครั้งให้แสดงรายการไฟล์ที่จะ push แล้วอ่านด้วยตาเองก่อน
- **ห้ามใช้ framework** ใด ๆ (React, Vue, Next.js, Tailwind ฯลฯ)
- **ห้ามเขียนเซิร์ฟเวอร์ของตัวเอง** (Express, Node server, Cloud Functions)
- **ห้ามใส่ข้อมูลจริงของบุคคลใด ๆ** — ใช้เฉพาะ seed data สมมติตาม leaveeasy-spec.md หัวข้อ 7
- **ห้ามทำงานของสัปดาห์ถัดไปล่วงหน้า** — ขอบเขตแต่ละสัปดาห์: leaveeasy-spec.md หัวข้อ 8, สิ่งที่ยังไม่ทำทั้ง Module: หัวข้อ 9
- **ห้ามพิมพ์รหัสผ่านหรือ token (เช่น GitHub token) ลงในแชทหรือเก็บลงไฟล์ใด ๆ เด็ดขาด**
