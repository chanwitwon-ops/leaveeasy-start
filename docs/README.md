# docs — หลักฐาน Checkpoint

โฟลเดอร์นี้ไว้เก็บภาพหน้าจอที่ GitHub มองไม่เห็นในโค้ด เช่น หน้า Firebase Console

## ภาพที่มีอยู่ตอนนี้

| ไฟล์ | เนื้อหา | Checkpoint |
|---|---|---|
| `checkpoint-1-website-leave-requests.png` | หน้า `leave-requests.html` เปิดในเบราว์เซอร์ อ่านข้อมูลจริงจาก Firestore | ✅ Checkpoint 1 (เว็บเปิดได้) |
| `checkpoint-3-firestore-console.png` | Firebase Console เห็น `leaveRequests` 5 ใบ + รายละเอียดเอกสาร `lr001` | ✅ Checkpoint 3 |
| `checkpoint-4-console-after-edit.png` | Firebase Console หลังแก้ `title` ของ `lr001` เป็น "ลาพักร้อนไปพักผ่อนกับครอบครัว" | ✅ Checkpoint 4 (ฝั่ง Console — ก่อน) |
| `checkpoint-4-website-after-edit.png` | หน้ารายการใบลา แถวเดียวกันเปลี่ยนชื่อตาม Console ทันที | ✅ Checkpoint 4 (ฝั่งเว็บ — หลัง) — **สองไฟล์นี้เป็นคู่กัน ค่าตรงกัน ใช้พิสูจน์ D2 ได้จริง** |
| `extra-detail-page-not-connected.png` | หน้ารายละเอียดใบลา (`leave-request-detail.html`) ยังโชว์ชื่อเก่า | ไม่ใช่ Checkpoint บังคับ — แต่ใช้พิสูจน์ความเข้าใจขอบเขตงานว่าหน้านี้ยังไม่ต่อ Firestore (ตั้งใจ ไม่ใช่บั๊ก) |

📌 ตัดภาพหน้า `index.html` และ `new-leave-request.html` ที่เคยเก็บไว้ออกแล้ว เพราะไม่ผูกกับ Checkpoint ไหนเลย

## ยังขาดอยู่

- **Checkpoint 1** ส่วนหน้า repo บน GitHub (README มีชื่อ + commit ในชื่อคุณ) — ยังไม่มีภาพ
- **Checkpoint 2** กระดาษที่วาดโครงสร้างข้อมูลด้วยมือ — ต้องถ่ายรูปกระดาษจริง
