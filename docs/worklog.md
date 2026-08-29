# บันทึกการทำงาน — ใบงานที่ 1 (สัปดาห์ที่ 6)

**ผู้ทำ:** ชาญวิทย์ วงศ์ทิพย์ · **วันที่ทำ:** 29 สิงหาคม 2569

สรุปลำดับการลงมือทำจริง อ้างอิงตาม commit ใน repo นี้ ใช้ตรวจสอบย้อนหลังหรือเตรียมอธิบายตอน Consult

## ส่วน A — LeaveEasy เข้า repo ของคุณ

| ขั้น | ทำอะไร | Commit |
|---|---|---|
| A1 | Fork `cnacha-mfu/leaveeasy-start` มาที่บัญชี `chanwitwon-ops` แล้วโคลนลงเครื่องในโฟลเดอร์ `leaveeasy` | `7958ce0` (จุดเริ่มต้นจากต้นแบบ) |
| A2 | เขียนชื่อผู้ทำใน `README.md` แล้ว commit + push ทดสอบว่า GitHub auth เชื่อมกับเครื่องแล้ว (ผ่านโดยไม่ต้องเปิดหน้าต่างล็อกอิน เพราะตั้งค่า `gh` ไว้ล่วงหน้า) | `a7b2cbf` |
| A3 | รันเว็บในเบราว์เซอร์ผ่าน local server (`http://localhost:3000`) เดินหน้าเว็บได้ครบทุกหน้า | — |
| A4 | พิสูจน์ว่าเว็บยังไม่มีความจำ: กรอกฟอร์มยื่นใบลา → บันทึกลง `sessionStorage` เท่านั้น → ปิดแท็บ/เปิดใหม่ → ข้อมูลหายจริง (กด F5 เฉยๆ ไม่หาย เพราะ `sessionStorage` อยู่รอด refresh แต่ไม่รอดการปิดแท็บ) | — |

**Checkpoint 1:** ✅ ดูภาพ [`checkpoint-1-website-leave-requests.png`](checkpoint-1-website-leave-requests.png)

## ส่วน B — โครงสร้างข้อมูลบนกระดาษ

ออกแบบโครงสร้าง 3 โฟลเดอร์ (`users` · `leaveTypes` · `leaveRequests`) + 1 โฟลเดอร์ย่อย (`approvals`) ตามกติกา denormalize ไม่มี JOIN — วาดด้วยมือลงกระดาษตามตัวอย่างอ้างอิงที่เตรียมไว้

**Checkpoint 2:** ⬜ รอถ่ายภาพกระดาษ

## ส่วน C — สร้าง Firestore จริง

| ขั้น | ทำอะไร | หลักฐาน |
|---|---|---|
| C1 | สร้าง Firestore Database บนโปรเจกต์ Firebase ที่มีอยู่แล้ว (`leaveeasy-43342`) โหมดทดสอบ ที่ตั้ง `asia-southeast1` | — |
| C2 | ลงทะเบียนเว็บแอปใน Firebase Console ดึงค่า `firebaseConfig` แล้วเขียนแผนก่อนลงมือ (จังหวะที่ 3) จากนั้นสร้าง `js/firebase-config.js` + `js/firebase.js` (โหลด Firebase SDK แบบ ES module ผ่าน CDN) | `037a989` |
| C3 | สร้างหน้า `seed.html` + `js/seed.js` ใส่ข้อมูลตัวอย่างชุดเดียวกับ `js/data.js` ลง Firestore จริง (users 3, leaveTypes 3, leaveRequests 5, approvals 4) | `037a989` |
| C4 | เปิด Firebase Console ยืนยันเห็นข้อมูลครบ | [`checkpoint-3-firestore-console.png`](checkpoint-3-firestore-console.png) |

**Checkpoint 3:** ✅

## ส่วน D — หน้ารายการอ่านจากคลังจริง

| ขั้น | ทำอะไร | หลักฐาน |
|---|---|---|
| D1 | แก้ `js/leave-requests.js` ให้ดึงข้อมูลจาก Firestore collection `leaveRequests` จริง (เรียงใหม่→เก่าตาม `createdAt`) แทนข้อมูลปลอมใน `js/data.js` — หน้าอื่น (`leave-request-detail.html` ฯลฯ) ยังไม่แตะ เพราะเป็นขอบเขตของสัปดาห์ถัดไป | `037a989` |
| D2 | ทดสอบเอง: แก้ `title` ของ `lr001` ใน Firebase Console เป็น "ลาพักร้อนไปพักผ่อนกับครอบครัว" แล้วเปิดหน้ารายการใหม่ → ข้อความเปลี่ยนตามจริง (ตั้งใจไม่แก้กลับ เพื่อเป็นหลักฐานว่าทดสอบเองจริง) — ระหว่างทางยังสังเกตด้วยว่าหน้ารายละเอียด (`leave-request-detail.html`) ไม่เปลี่ยนตาม เพราะหน้านั้นยังไม่ต่อ Firestore (ถูกต้องตามขอบเขต ไม่ใช่บั๊ก) | [`checkpoint-4-console-after-edit.png`](checkpoint-4-console-after-edit.png) + [`checkpoint-4-website-after-edit.png`](checkpoint-4-website-after-edit.png) |
| D3 | Commit + push ทุกไฟล์ที่แก้ขึ้น GitHub | `037a989`–`3169d08` |

**Checkpoint 4:** ✅

## หมายเหตุ

- เครื่องมือรันเว็บในเครื่อง (`static-server.ps1`) ใช้เฉพาะเครื่องนี้ ไม่ได้ส่งขึ้น repo (กันไว้ใน `.gitignore`)
- `js/firebase-config.js` ใส่ `apiKey` ตรงๆ ได้ตามที่ตั้งใจไว้สัปดาห์นี้ เพราะเป็น Firebase Web API key ที่ไม่ใช่ความลับ — การกันไฟล์ที่มีคีย์จริงจะเริ่มสัปดาห์ที่ 7
