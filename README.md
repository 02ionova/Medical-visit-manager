# Medical Visit Manager 🏥

> INSERT YOUR GIF / SCREEN RECORDING HERE

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

> INSERT SCREENSHOT HERE

---

## Patients Page

> INSERT SCREENSHOT HERE

---

## Patient Form

> INSERT SCREENSHOT HERE

---

## Appointments Page

> INSERT SCREENSHOT HERE

---

## Appointment Form

> INSERT SCREENSHOT HERE

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
