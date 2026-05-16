import { useState } from "react";

function PatientForm({ patient, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        fullName: patient?.fullName || "",
        phone: patient?.phone || "",
        dateOfBirth: patient?.dateOfBirth || "",
        address: patient?.address || "",
        note: patient?.note || "",
    });

    const [error, setError] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");

        try {
            await onSubmit(formData);
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <div style={overlayStyle}>
            <form style={modalStyle} onSubmit={handleSubmit}>
                <h2>{patient ? "Edit Patient" : "New Patient"}</h2>

                <div style={formGridStyle}>
                    <label>
                        Full name
                        <input
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            style={inputStyle}
                            placeholder="Patient name"
                            required
                        />
                    </label>

                    <label>
                        Phone
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            style={inputStyle}
                            placeholder="+420..."
                            required
                        />
                    </label>

                    <label>
                        Date of birth
                        <input
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            style={inputStyle}
                            type="date"
                            required
                        />
                    </label>

                    <label>
                        Address
                        <input
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            style={inputStyle}
                            placeholder="City, Street, ZIP"
                            required
                        />
                    </label>
                </div>

                <label>
                    Note
                    <textarea
                        name="note"
                        value={formData.note}
                        onChange={handleChange}
                        style={textareaStyle}
                        placeholder="Additional note"
                    />
                </label>

                {error && (
                    <p style={{ color: "red", marginTop: "12px" }}>
                        {error}
                    </p>
                )}

                <div style={footerStyle}>
                    <button type="button" style={cancelButtonStyle} onClick={onClose}>
                        Cancel
                    </button>

                    <button type="submit" style={createButtonStyle}>
                        {patient ? "Save changes" : "Create"}
                    </button>
                </div>
            </form>
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
    width: "700px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
};

const formGridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
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

export default PatientForm;