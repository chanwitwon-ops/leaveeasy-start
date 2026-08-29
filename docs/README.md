# docs — หลักฐาน Checkpoint

โฟลเดอร์นี้ไว้เก็บภาพหน้าจอที่ GitHub มองไม่เห็นในโค้ด เช่น หน้า Firebase Console
เก็บเฉพาะภาพที่ผูกกับ Checkpoint จริงเท่านั้น เพื่อความสะอาด

## ภาพที่มีอยู่ตอนนี้

| ไฟล์ | เนื้อหา | Checkpoint |
|---|---|---|
| `checkpoint-1-website-leave-requests.png` | หน้า `leave-requests.html` เปิดในเบราว์เซอร์ อ่านข้อมูลจริงจาก Firestore | ✅ Checkpoint 1 |
| `checkpoint-3-firestore-console.png` | Firebase Console เห็น `leaveRequests` 5 ใบ + รายละเอียดเอกสาร `lr001` | ✅ Checkpoint 3 |
| `checkpoint-4-console-after-edit.png` | Firebase Console หลังแก้ `title` ของ `lr001` เป็น "ลาพักร้อนไปพักผ่อนกับครอบครัว" | ✅ Checkpoint 4 (ฝั่ง Console) |
| `checkpoint-4-website-after-edit.png` | หน้ารายการใบลา แถวเดียวกันเปลี่ยนชื่อตาม Console ทันที | ✅ Checkpoint 4 (ฝั่งเว็บ) — คู่กับไฟล์ข้างบน ค่าตรงกันจริง |

## ยังขาดอยู่

- **Checkpoint 2** กระดาษที่วาดโครงสร้างข้อมูลด้วยมือ — ต้องถ่ายรูปกระดาษจริง
