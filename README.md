# Medical Visit Manager 🏥

<img width="800" height="432" alt="ScreenRecording2026-05-17at9 23 37-ezgif com-video-to-gif-converter (1)" src="https://github.com/user-attachments/assets/f47d3f35-f19d-48c3-a3ed-4868ff8cde0b" />




---

# ✨ Overview

Medical Visit Manager is a full-stack web application designed for managing patients and medical appointments in a modern and user-friendly way.

The system allows healthcare staff to:

* manage patients,
* create and edit appointments,
* track appointment statuses,
* search and filter records,
* monitor upcoming visits,
* and visualize statistics on a dashboard.

The application was built as a university project using **React**, **Node.js**, and **Express**.

---

# 🚀 Features

## 👤 Patient Management

✅ Add new patients

✅ Edit patient information

✅ Delete patients

✅ Prevent deleting patients with existing appointments

✅ Search patients by name or phone number

✅ View patient details in a modal window

---

## 📅 Appointment Management

✅ Create appointments

✅ Edit appointments

✅ Delete appointments

✅ View appointment details

✅ Appointment statuses:

* Planned
* Completed
* Cancelled

✅ Search appointments

✅ Filter appointments by:

* patient/procedure name
* date
* status

✅ Smart patient search inside appointment form
(type patient name and select from dropdown)

---

## 📊 Dashboard

The dashboard provides real-time visual statistics:

✅ Total patients

✅ Total appointments

✅ Planned / Completed / Cancelled statistics

✅ Pie chart for appointment types

✅ Appointment activity chart

✅ Prague live clock

✅ European city clocks

---

# 🛠 Technologies Used

## Frontend

* React
* Vite
* JavaScript
* CSS

## Backend

* Node.js
* Express.js

## Data Storage

* JSON files (`patients.json`, `appointments.json`)

---

# 📁 Project Structure

```text
Medical-visit-manager/
│
├── dao/
│   ├── appointmentDao.js
│   └── patientDao.js
│
├── data/
│   ├── appointments.json
│   └── patients.json
│
├── routes/
│   ├── appointmentRoutes.js
│   └── patientRoutes.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server.js
├── package.json
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone repository

```bash
git clone https://github.com/02ionova/Medical-visit-manager.git
```

---

## 2️⃣ Install backend dependencies

From project root:

```bash
npm install
```

---

## 3️⃣ Install frontend dependencies

```bash
cd frontend
npm install
```

---

# ▶️ Running the Project

## Start backend server

From project root:

```bash
npm start
```

Backend runs on:

```text
http://localhost:3000
```

---

## Start frontend

Open second terminal:

```bash
cd frontend
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# 🧠 Business Logic & Validation

The application includes several validation rules:

✅ Appointment end time must be after start time

✅ Required fields validation

✅ Patients with appointments cannot be deleted

✅ Search and filtering functionality

✅ Appointment status management

---

# 📦 Seed Data

The system already includes:

✅ 50 patients

✅ Multiple appointment types

✅ Past and future appointments

✅ Planned / Completed / Cancelled statuses

Appointment categories include:

* IV drip
* Injection
* Blood test
* Wound care
* Health monitoring

---

# 🎨 UI & UX Improvements

The application includes:

✨ Modern dashboard

✨ Responsive modal windows

✨ Searchable patient selection

✨ Improved tables and spacing

✨ Status badges with colors

✨ Clean modern interface

✨ Interactive charts

---

# 📸 Screenshots

## Dashboard
<img width="1470" height="794" alt="Screenshot 2026-05-17 at 9 42 44" src="https://github.com/user-attachments/assets/73b9ba79-78a1-412f-ae22-d6470a31d6cd" />

---

## Patients Page
<img width="1470" height="794" alt="Screenshot 2026-05-17 at 9 44 04" src="https://github.com/user-attachments/assets/ad2353d4-1a1a-4491-a09b-7dd85dd7b811" />

---

## Patient Form

<img width="1470" height="794" alt="Screenshot 2026-05-17 at 9 44 27" src="https://github.com/user-attachments/assets/35d4e2d7-9596-47c1-a1c7-a20419dc5dbe" />

---

## Appointments Page

<img width="1470" height="794" alt="Screenshot 2026-05-17 at 9 44 48" src="https://github.com/user-attachments/assets/85b634ee-e3bc-4a3c-87e8-c47b126bee18" />


---

## Appointment Form

<img width="1470" height="794" alt="Screenshot 2026-05-17 at 9 45 08" src="https://github.com/user-attachments/assets/36cf88c1-c864-4fbf-9bc3-3ed4fbb0e6b8" />

---

# 🔮 Future Improvements

Possible future upgrades:

* Database integration (MongoDB / PostgreSQL)
* Authentication & login
* Nurse management
* Calendar integration
* Notifications
* Mobile responsiveness
* Dark mode
* Export to PDF
* Real scheduling system

---

# 👩‍💻 Author

**Natalia Ionova**

University project — Medical Visit Manager
Built with React + Node.js + Express
