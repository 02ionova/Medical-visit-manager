import { useEffect, useState } from "react";
import { getAppointmentsByPatient } from "../api/appointmentApi";

function PatientDetail({ patient, onClose }) {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadAppointments() {
            try {
                const data = await getAppointmentsByPatient(patient.id);
                setAppointments(data);
            } catch (e) {
                setError("Could not load patient appointments.");
            }
        }

        loadAppointments();
    }, [patient.id]);

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <button style={closeButtonStyle} onClick={onClose}>
                    ×
                </button>

                <div style={contentStyle}>
                    <div style={patientCardStyle}>
                        <p>Full name</p>
                        <h2>{patient.fullName}</h2>

                        <p>Phone</p>
                        <h3>{patient.phone}</h3>

                        <p>Date of birth</p>
                        <h3>{patient.dateOfBirth}</h3>

                        <p>Address</p>
                        <h3>{patient.address}</h3>

                        <p>Note</p>
                        <h3>{patient.note || "No note"}</h3>
                    </div>

                    <div style={appointmentsCardStyle}>
                        <h2>Appointments</h2>

                        {error && <p style={{ color: "red" }}>{error}</p>}

                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                            <tr style={{ background: "#2563eb", color: "white" }}>
                                <th style={thStyle}>Type</th>
                                <th style={thStyle}>Date</th>
                                <th style={thStyle}>From</th>
                                <th style={thStyle}>To</th>
                                <th style={thStyle}>Price</th>
                            </tr>
                            </thead>

                            <tbody>
                            {appointments.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td style={tdStyle}>{appointment.type}</td>
                                    <td style={tdStyle}>{appointment.date}</td>
                                    <td style={tdStyle}>{appointment.from}</td>
                                    <td style={tdStyle}>{appointment.to}</td>
                                    <td style={tdStyle}>${appointment.price}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        {appointments.length === 0 && (
                            <p style={{ color: "#6b7280", marginTop: "20px" }}>
                                This patient has no appointments.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

const overlayStyle = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

const modalStyle = {
    position: "relative",
    background: "white",
    borderRadius: "24px",
    padding: "32px",
    width: "900px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
};

const closeButtonStyle = {
    position: "absolute",
    top: "20px",
    right: "24px",
    border: "none",
    background: "transparent",
    fontSize: "30px",
    cursor: "pointer",
};

const contentStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    gap: "30px",
};

const patientCardStyle = {
    background: "#f9fafb",
    borderRadius: "20px",
    padding: "24px",
};

const appointmentsCardStyle = {
    background: "#f9fafb",
    borderRadius: "20px",
    padding: "24px",
};

const thStyle = {
    textAlign: "left",
    padding: "10px",
};

const tdStyle = {
    padding: "10px",
    borderBottom: "1px solid #e5e7eb",
};

export default PatientDetail;