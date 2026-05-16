import { useState } from "react";

function AppointmentForm({ patients, appointment, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        date: appointment?.date || "",
        from: appointment?.from || "",
        to: appointment?.to || "",
        type: appointment?.type || "",
        price: appointment?.price || "",
        note: appointment?.note || "",
        patientId: appointment?.patientId || "",
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
            await onSubmit({
                ...formData,
                price: Number(formData.price),
            });
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <div style={overlayStyle}>
            <form style={modalStyle} onSubmit={handleSubmit}>
                <h2>{appointment ? "Edit Appointment" : "New Appointment"}</h2>

                <div style={formGridStyle}>
                    <label>
                        Date of appointment
                        <input
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            style={inputStyle}
                            type="date"
                            required
                        />
                    </label>

                    <label>
                        Time From
                        <input
                            name="from"
                            value={formData.from}
                            onChange={handleChange}
                            style={inputStyle}
                            type="time"
                            required
                        />
                    </label>

                    <label>
                        Time To
                        <input
                            name="to"
                            value={formData.to}
                            onChange={handleChange}
                            style={inputStyle}
                            type="time"
                            required
                        />
                    </label>

                    <label>
                        Type
                        <input
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            style={inputStyle}
                            placeholder="IV drip, Injection, etc"
                            required
                        />
                    </label>

                    <label>
                        Price
                        <input
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            style={inputStyle}
                            type="number"
                            placeholder="500"
                            required
                        />
                    </label>

                    <label>
                        Patient
                        <select
                            name="patientId"
                            value={formData.patientId}
                            onChange={handleChange}
                            style={inputStyle}
                            required
                        >
                            <option value="">Select patient</option>
                            {patients.map((patient) => (
                                <option key={patient.id} value={patient.id}>
                                    {patient.fullName}
                                </option>
                            ))}
                        </select>
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

                {error && <p style={{ color: "red", marginTop: "12px" }}>{error}</p>}

                <div style={footerStyle}>
                    <button type="button" style={cancelButtonStyle} onClick={onClose}>
                        Cancel
                    </button>

                    <button type="submit" style={createButtonStyle}>
                        {appointment ? "Save changes" : "Create"}
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