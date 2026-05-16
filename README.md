# Medical Visit Manager

Modern full-stack web application for managing patients and medical appointments.

The application allows administrators to manage patients, schedule medical visits, track appointment statuses, and view dashboard statistics.

---

# Features

## Patient Management
- Create patient
- Edit patient
- Delete patient
- View patient detail
- Search patients by name or phone number

## Appointment Management
- Create appointment
- Edit appointment
- Delete appointment
- View appointment detail
- Filter appointments by:
  - patient
  - procedure type
  - date
  - status

## Appointment Status System
Appointments support:
- Planned
- Completed
- Cancelled

Each status has its own color badge.

## Dashboard
- Total patients
- Total appointments
- Today appointments
- Appointment status statistics
- Pie chart by appointment type
- Bar chart by appointment dates
- Real-time European clocks

---

# Technologies

## Frontend
- React
- JavaScript
- CSS-in-JS styling

## Backend
- Node.js
- Express.js

## Data Storage
- JSON files

---

# Project Structure

```text
backend/
frontend/
data/
```

---

# Entities

## Patient

```json
{
  "id": "1",
  "fullName": "Anna Novak",
  "phone": "+420771293480",
  "dateOfBirth": "1992-05-14",
  "address": "Prague",
  "note": "VIP client"
}
```

## Appointment

```json
{
  "id": "1",
  "patientId": "1",
  "type": "IV drip",
  "date": "2026-05-20",
  "from": "12:00",
  "to": "13:00",
  "price": 1500,
  "status": "Planned",
  "note": "Immune support"
}
```

---

# Installation

## 1. Clone repository

```bash
git clone <repository-url>
```

---

# Backend Setup

## Enter backend folder

```bash
cd backend
```

## Install dependencies

```bash
npm install
```

## Start backend server

```bash
npm start
```

Backend runs on:

```text
http://localhost:3000
```

---

# Frontend Setup

## Enter frontend folder

```bash
cd frontend
```

## Install dependencies

```bash
npm install
```

## Start frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Screenshots

## Dashboard
- Statistics cards
- Status overview
- Charts
- Analog clocks

## Patients
- Patient management table
- Search functionality
- Detail modal

## Appointments
- Appointment filtering
- Status badges
- Appointment detail modal

---

# Author

Natalia Ionova

Unicorn University

2026
