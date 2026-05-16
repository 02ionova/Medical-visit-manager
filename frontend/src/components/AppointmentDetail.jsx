function AppointmentDetail({ appointment, patientName, onClose }) {
    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <button style={closeButtonStyle} onClick={onClose}>
                    ×
                </button>

                <div style={headerStyle}>
                    <div style={iconStyle}>🩺</div>

                    <div>
                        <h2 style={{ margin: 0 }}>Appointment Detail</h2>
                        <p style={{ color: "#64748b", marginTop: "6px" }}>
                            Detailed information about selected medical visit
                        </p>
                    </div>
                </div>

                <div style={contentStyle}>
                    <InfoItem label="Type" value={appointment.type} />
                    <InfoItem label="Patient" value={patientName} />
                    <InfoItem label="Date" value={appointment.date} />
                    <InfoItem label="Time" value={`${appointment.from} - ${appointment.to}`} />
                    <InfoItem label="Price" value={`$${appointment.price}`} />
                    <InfoItem label="Note" value={appointment.note || "No note"} />
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
    width: "560px",
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
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "24px",
};

const iconStyle = {
    width: "58px",
    height: "58px",
    borderRadius: "18px",
    background: "#dbeafe",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
};

const contentStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
};

const infoItemStyle = {
    background: "#f8fafc",
    borderRadius: "16px",
    padding: "16px",
};

const infoLabelStyle = {
    display: "block",
    color: "#64748b",
    fontSize: "13px",
    marginBottom: "6px",
};

const infoValueStyle = {
    color: "#1e293b",
    fontSize: "16px",
    lineHeight: "1.4",
};

export default AppointmentDetail;