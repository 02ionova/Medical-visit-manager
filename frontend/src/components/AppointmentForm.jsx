import { useEffect, useState } from "react";
import { getPatients } from "../api/patientApi";

function AppointmentForm({
                             appointment,
                             onClose,
                             onSubmit,
                         }) {
    const [date, setDate] = useState(appointment?.date || "");
    const [from, setFrom] = useState(appointment?.from || "");
    const [to, setTo] = useState(appointment?.to || "");
    const [type, setType] = useState(appointment?.type || "");
    const [price, setPrice] = useState(appointment?.price || "");
    const [status, setStatus] = useState(
        appointment?.status || "Planned"
    );
    const [note, setNote] = useState(appointment?.note || "");
    const [patientId, setPatientId] = useState(
        appointment?.patientId || ""
    );

    const [patients, setPatients] = useState([]);

    const [searchPatient, setSearchPatient] = useState("");
    const [showPatientDropdown, setShowPatientDropdown] =
        useState(false);

    const [error, setError] = useState("");

    useEffect(() => {
        async function loadPatients() {
            try {
                const data = await getPatients();
                setPatients(data);

                if (appointment?.patientId) {
                    const selectedPatient = data.find(
                        (p) => p.id === appointment.patientId
                    );

                    if (selectedPatient) {
                        setSearchPatient(selectedPatient.fullName);
                    }
                }
            } catch (e) {
                setError("Could not load patients.");
            }
        }

        loadPatients();
    }, [appointment]);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!date || !from || !to || !type || !patientId) {
            setError("Please fill all required fields.");
            return;
        }

        if (to <= from) {
            setError("End time must be after start time.");
            return;
        }

        try {
            await onSubmit({
                patientId,
                type,
                date,
                from,
                to,
                price: Number(price),
                status,
                note,
            });
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <h2 style={{ marginBottom: "24px" }}>
                    {appointment ? "Edit Appointment" : "New Appointment"}
                </h2>

                {error && (
                    <p style={errorStyle}>{error}</p>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={gridStyle}>
                        <div>
                            <label style={labelStyle}>
                                Date of appointment
                            </label>

                            <input
                                type="date"
                                value={date}
                                onChange={(e) =>
                                    setDate(e.target.value)
                                }
                                style={inputStyle}
                            />
                        </div>

                        <div>
                            <label style={labelStyle}>
                                Time From
                            </label>

                            <input
                                type="time"
                                value={from}
                                onChange={(e) =>
                                    setFrom(e.target.value)
                                }
                                style={inputStyle}
                            />
                        </div>

                        <div>
                            <label style={labelStyle}>
                                Time To
                            </label>

                            <input
                                type="time"
                                value={to}
                                onChange={(e) =>
                                    setTo(e.target.value)
                                }
                                style={inputStyle}
                            />
                        </div>

                        <div>
                            <label style={labelStyle}>
                                Type
                            </label>

                            <input
                                type="text"
                                placeholder="IV drip, Injection, etc"
                                value={type}
                                onChange={(e) =>
                                    setType(e.target.value)
                                }
                                style={inputStyle}
                            />
                        </div>

                        <div>
                            <label style={labelStyle}>
                                Price
                            </label>

                            <input
                                type="number"
                                placeholder="500"
                                value={price}
                                onChange={(e) =>
                                    setPrice(e.target.value)
                                }
                                style={inputStyle}
                            />
                        </div>

                        <div>
                            <label style={labelStyle}>
                                Status
                            </label>

                            <div style={selectWrapperStyle}>
                                <select
                                    value={status}
                                    onChange={(e) =>
                                        setStatus(e.target.value)
                                    }
                                    style={selectStyle}
                                >
                                    <option value="Planned">
                                        Planned
                                    </option>

                                    <option value="Completed">
                                        Completed
                                    </option>

                                    <option value="Cancelled">
                                        Cancelled
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: "20px" }}>
                        <label style={labelStyle}>
                            Patient
                        </label>

                        <div style={{ position: "relative" }}>
                            <input
                                type="text"
                                placeholder="Search patient..."
                                value={
                                    patients.find(
                                        (p) => p.id === patientId
                                    )?.fullName || searchPatient
                                }
                                onChange={(e) => {
                                    setSearchPatient(
                                        e.target.value
                                    );
                                    setPatientId("");
                                    setShowPatientDropdown(true);
                                }}
                                onFocus={() =>
                                    setShowPatientDropdown(true)
                                }
                                style={inputStyle}
                            />

                            {showPatientDropdown && (
                                <div style={dropdownStyle}>
                                    {patients
                                        .filter((patient) =>
                                            patient.fullName
                                                .toLowerCase()
                                                .includes(
                                                    searchPatient.toLowerCase()
                                                )
                                        )
                                        .slice(0, 6)
                                        .map((patient) => (
                                            <div
                                                key={patient.id}
                                                onClick={() => {
                                                    setPatientId(patient.id);
                                                    setSearchPatient(
                                                        patient.fullName
                                                    );
                                                    setShowPatientDropdown(
                                                        false
                                                    );
                                                }}
                                                style={dropdownItemStyle}
                                            >
                                                {patient.fullName}
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={{ marginTop: "20px" }}>
                        <label style={labelStyle}>
                            Note
                        </label>

                        <textarea
                            placeholder="Additional note"
                            value={note}
                            onChange={(e) =>
                                setNote(e.target.value)
                            }
                            rows="4"
                            style={textareaStyle}
                        />
                    </div>

                    <div style={buttonContainerStyle}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={cancelButtonStyle}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            style={submitButtonStyle}
                        >
                            {appointment ? "Save" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(15, 23, 42, 0.45)",
    backdropFilter: "blur(4px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
};

const modalStyle = {
    background: "white",
    padding: "40px",
    borderRadius: "28px",
    width: "900px",
    maxWidth: "95%",
    boxShadow: "0 25px 60px rgba(0,0,0,0.18)",
};

const gridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "20px",
};

const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#1e293b",
};

const inputStyle = {
    width: "100%",
    padding: "14px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
};

const textareaStyle = {
    width: "100%",
    padding: "14px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    resize: "none",
    outline: "none",
    boxSizing: "border-box",
};

const selectWrapperStyle = {
    position: "relative",
};

const selectStyle = {
    width: "100%",
    padding: "14px 42px 14px 14px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    background: "white",
    outline: "none",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    boxSizing: "border-box",
};

const dropdownStyle = {
    position: "absolute",
    top: "105%",
    left: 0,
    right: 0,
    background: "white",
    borderRadius: "14px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
    border: "1px solid #e2e8f0",
    maxHeight: "220px",
    overflowY: "auto",
    zIndex: 100,
};

const dropdownItemStyle = {
    padding: "12px 14px",
    cursor: "pointer",
    borderBottom: "1px solid #f1f5f9",
};

const buttonContainerStyle = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "30px",
};

const cancelButtonStyle = {
    background: "#6b7280",
    color: "white",
    border: "none",
    borderRadius: "12px",
    padding: "12px 22px",
    cursor: "pointer",
    fontWeight: "600",
};

const submitButtonStyle = {
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "12px",
    padding: "12px 22px",
    cursor: "pointer",
    fontWeight: "600",
};

const errorStyle = {
    color: "#ef4444",
    marginBottom: "20px",
    fontWeight: "500",
};

export default AppointmentForm;