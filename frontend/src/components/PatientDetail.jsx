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

                <div style={headerStyle}>
                    <h2 style={{ margin: 0 }}>Patient Detail</h2>
                    <p style={{ color: "#64748b", marginTop: "6px" }}>
                        Patient information and appointment history
                    </p>
                </div>

                <div style={contentStyle}>
                    <div style={patientCardStyle}>
                        <div style={avatarStyle}>
                            {patient.fullName?.charAt(0).toUpperCase()}
                        </div>

                        <h3 style={patientNameStyle}>{patient.fullName}</h3>

                        <InfoItem label="Phone" value={patient.phone} />
                        <InfoItem label="Date of birth" value={patient.dateOfBirth} />
                        <InfoItem label="Address" value={patient.address} />
                        <InfoItem label="Note" value={patient.note || "No note"} />
                    </div>

                    <div style={appointmentsCardStyle}>
                        <div style={sectionHeaderStyle}>
                            <h3 style={{ margin: 0 }}>Appointments</h3>
                            <span style={badgeStyle}>{appointments.length}</span>
                        </div>

                        {error && <p style={{ color: "#ef4444" }}>{error}</p>}

                        {appointments.length > 0 ? (
                            <table style={tableStyle}>
                                <thead>
                                <tr>
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
                        ) : (
                            <div style={emptyStateStyle}>
                                This patient has no appointments.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoItem({ label, value }) {
    return (
        <div style={infoItemStyle}>
            <span style={infoLabelStyle}>{label}</span>
            <strong style={infoValueStyle}>{value || "—"}</strong>
        </div>
    );
}

const overlayStyle = {
    position: "fixed",
    inset: 0,
    background: "rgba(15, 23, 42, 0.45)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
};

const modalStyle = {
    position: "relative",
    background: "white",
    borderRadius: "28px",
    padding: "32px",
    width: "920px",
    maxWidth: "92vw",
    boxShadow: "0 25px 70px rgba(15, 23, 42, 0.25)",
};

const closeButtonStyle = {
    position: "absolute",
    top: "22px",
    right: "26px",
    border: "none",
    background: "#f1f5f9",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    fontSize: "24px",
    cursor: "pointer",
    color: "#1e293b",
};

const headerStyle = {
    marginBottom: "24px",
};

const contentStyle = {
    display: "grid",
    gridTemplateColumns: "280px 1fr",
    gap: "24px",
};

const patientCardStyle = {
    background: "#f8fafc",
    borderRadius: "22px",
    padding: "24px",
};

const avatarStyle = {
    width: "64px",
    height: "64px",
    borderRadius: "18px",
    background: "#2563eb",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "16px",
};

const patientNameStyle = {
    fontSize: "22px",
    margin: "0 0 20px",
};

const infoItemStyle = {
    padding: "12px 0",
    borderBottom: "1px solid #e2e8f0",
};

const infoLabelStyle = {
    display: "block",
    color: "#64748b",
    fontSize: "13px",
    marginBottom: "4px",
};

const infoValueStyle = {
    fontSize: "15px",
    color: "#1e293b",
    lineHeight: "1.4",
};

const appointmentsCardStyle = {
    background: "#f8fafc",
    borderRadius: "22px",
    padding: "24px",
};

const sectionHeaderStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "16px",
};

const badgeStyle = {
    background: "#dbeafe",
    color: "#1d4ed8",
    padding: "6px 12px",
    borderRadius: "999px",
    fontWeight: "700",
};

const tableStyle = {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 8px",
};

const thStyle = {
    textAlign: "left",
    padding: "12px",
    color: "#64748b",
    fontSize: "13px",
    fontWeight: "600",
};

const tdStyle = {
    background: "white",
    padding: "14px 12px",
    borderBottom: "1px solid #f1f5f9",
    fontSize: "14px",
};

const emptyStateStyle = {
    background: "white",
    borderRadius: "16px",
    padding: "28px",
    color: "#64748b",
    textAlign: "center",
};

export default PatientDetail;