function AppointmentForm({ onClose }) {
    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <h2>New Appointment</h2>

                <div style={formGridStyle}>
                    <label>
                        Date of appointment
                        <input style={inputStyle} type="date" />
                    </label>

                    <label>
                        Time From
                        <input style={inputStyle} type="time" />
                    </label>

                    <label>
                        Time To
                        <input style={inputStyle} type="time" />
                    </label>

                    <label>
                        Type
                        <input style={inputStyle} placeholder="IV drip, Injection, etc" />
                    </label>

                    <label>
                        Price
                        <input style={inputStyle} type="number" placeholder="500" />
                    </label>

                    <label>
                        Patient name
                        <input style={inputStyle} placeholder="Patient name" />
                    </label>
                </div>

                <label>
                    Note
                    <textarea style={textareaStyle} placeholder="Additional note" />
                </label>

                <div style={footerStyle}>
                    <button style={cancelButtonStyle} onClick={onClose}>
                        Cancel
                    </button>
                    <button style={createButtonStyle}>Create</button>
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
    background: "white",
    borderRadius: "24px",
    padding: "32px",
    width: "760px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
};

const formGridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "20px",
    marginBottom: "20px",
};

const inputStyle = {
    display: "block",
    width: "100%",
    marginTop: "8px",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
};

const textareaStyle = {
    ...inputStyle,
    minHeight: "100px",
};

const footerStyle = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "24px",
};

const cancelButtonStyle = {
    padding: "12px 18px",
    border: "none",
    borderRadius: "10px",
    background: "#6b7280",
    color: "white",
    cursor: "pointer",
};

const createButtonStyle = {
    padding: "12px 18px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
};

export default AppointmentForm;