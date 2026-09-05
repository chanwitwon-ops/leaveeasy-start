# docs — หลักฐาน Checkpoint

โฟลเดอร์นี้ไว้เก็บภาพหน้าจอที่ GitHub มองไม่เห็นในโค้ด เช่น หน้า Firebase Console
เก็บเฉพาะภาพที่ผูกกับ Checkpoint จริงเท่านั้น เพื่อความสะอาด

## ใบงานที่ 1 — สัปดาห์ที่ 6

| ไฟล์ | เนื้อหา | Checkpoint |
|---|---|---|
| `checkpoint-1-website-leave-requests.png` | หน้า `leave-requests.html` เปิดในเบราว์เซอร์ อ่านข้อมูลจริงจาก Firestore | ✅ Checkpoint 1 |
| `checkpoint-2-data-structure.png` | โครงสร้างข้อมูล 3 โฟลเดอร์ + 1 โฟลเดอร์ย่อย พร้อมช่องที่จดซ้ำวงกลมไว้ และคำตอบ 2 ข้อ | ✅ Checkpoint 2 |
| `checkpoint-3-firestore-console.png` | Firebase Console เห็น `leaveRequests` 5 ใบ + รายละเอียดเอกสาร `lr001` | ✅ Checkpoint 3 |
| `checkpoint-4-console-after-edit.png` | Firebase Console หลังแก้ `title` ของ `lr001` เป็น "ลาพักร้อนไปพักผ่อนกับครอบครัว" | ✅ Checkpoint 4 (ฝั่ง Console) |
| `checkpoint-4-website-after-edit.png` | หน้ารายการใบลา แถวเดียวกันเปลี่ยนชื่อตาม Console ทันที | ✅ Checkpoint 4 (ฝั่งเว็บ) — คู่กับไฟล์ข้างบน ค่าตรงกันจริง |

ครบทั้ง 4 Checkpoint ตามใบงานที่ 1 แล้ว

## ใบงานที่ 2 — สัปดาห์ที่ 7

| ไฟล์ | เนื้อหา | Checkpoint |
|---|---|---|
| `week7-checkpoint2-1-before-list.png` | หน้ารายการใบลา ก่อนยื่นใบใหม่ (7 ใบ) | ✅ Checkpoint 2 (1/4) |
| `week7-checkpoint2-2-new-request-form.png` | กรอกฟอร์มยื่นใบลาใหม่ "ลาแล้วแก้วตา" | ✅ Checkpoint 2 (2/4) |
| `week7-checkpoint2-3-after-save.png` | บันทึกสำเร็จ กลับมาหน้ารายการเห็นใบใหม่ (8 ใบ) | ✅ Checkpoint 2 (3/4) |
| `week7-checkpoint2-4-after-close-reopen-login.png` | ล็อกเอาท์ → ปิดเบราว์เซอร์ → เปิดใหม่ → ล็อกอินใหม่ → ยังเห็นใบลาที่เพิ่งเพิ่มครบ 8 ใบเหมือนเดิม | ✅ Checkpoint 2 (4/4) |
| `week7-checkpoint4-url-shared-in-group-chat.jpg` | โพสต์ URL ออนไลน์ `https://leaveeasy-43342.web.app` ในแชทกลุ่มคาบเรียน (Zoom) | ✅ Checkpoint 4 |
| `week7-checkpoint4-login-from-another-device.jpg` | เปิด URL จากคอมพิวเตอร์อีกเครื่อง คนละเน็ตเวิร์ก ยังไม่ล็อกอิน ขึ้นหน้า "เข้าสู่ระบบ" ทันที ไม่มีข้อมูลใบลาโผล่มา | ✅ Checkpoint 4 |
| `week7-checkpoint3-1-incognito-redirect-login.png` | เปิดหน้าต่าง Incognito ไม่ได้ล็อกอิน โดนเด้งไปหน้า `login.html` ทันที (auth-guard ฝั่ง client) | ✅ Checkpoint 3 (1/2) |
| `week7-checkpoint3-2-console-permission-denied.png` | จากหน้าต่าง Incognito เดียวกัน เปิด DevTools Console แล้วสั่งอ่าน `leaveRequests` ตรงผ่าน `window.db` โดยไม่ล็อกอิน ได้ error `permission-denied - Missing or insufficient permissions.` พิสูจน์ว่า Firestore Security Rules บล็อกจริง ไม่ใช่แค่หน้าเว็บกันไว้ | ✅ Checkpoint 3 (2/2) |

ครบทั้ง Checkpoint 2, 3, 4 ของใบงานที่ 2 แล้ว
