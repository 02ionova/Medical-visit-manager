function AppointmentDetail({ appointment, patientName, onClose }) {
    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <button style={closeButtonStyle} onClick={onClose}>
                    ×
                </button>

                <h2>Appointment Detail</h2>

                <p><strong>Type:</strong> {appointment.type}</p>
                <p><strong>Date:</strong> {appointment.date}</p>
                <p><strong>From:</strong> {appointment.from}</p>
                <p><strong>To:</strong> {appointment.to}</p>
                <p><strong>Patient:</strong> {patientName}</p>
                <p><strong>Price:</strong> ${appointment.price}</p>
                <p><strong>Note:</strong> {appointment.note || "No note"}</p>
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
    width: "500px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
};

const closeButtonStyle = {
    position: "absolute",
    top: "18px",
    right: "22px",
    border: "none",
    background: "transparent",
    fontSize: "28px",
    cursor: "pointer",
};

export default AppointmentDetail;