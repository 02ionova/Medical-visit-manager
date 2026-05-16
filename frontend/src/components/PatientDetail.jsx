function PatientDetail({ patient, onClose }) {
    const appointments = [
        {
            id: "1",
            type: "IV drip",
            date: "2025-04-05",
            from: "09:30",
            to: "10:00",
            price: 500,
        },
        {
            id: "2",
            type: "Injection",
            date: "2025-05-09",
            from: "10:00",
            to: "10:30",
            price: 200,
        },
        {
            id: "3",
            type: "Blood test",
            date: "2025-08-11",
            from: "19:00",
            to: "19:10",
            price: 100,
        },
    ];

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
                        <h3>1989-03-27</h3>

                        <p>Address</p>
                        <h3>Štěpánská 612/16, 110 00 Nové Město</h3>

                        <p>Note</p>
                        <h3>Allergic to nuts</h3>
                    </div>

                    <div style={appointmentsCardStyle}>
                        <h2>Appointments</h2>

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