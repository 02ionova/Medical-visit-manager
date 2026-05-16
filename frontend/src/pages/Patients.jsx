import { useEffect, useState } from "react";
import PatientForm from "../components/PatientForm";
import PatientDetail from "../components/PatientDetail";
import { createPatient, getPatients } from "../api/patientApi";

function Patients() {
    const [patients, setPatients] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [error, setError] = useState("");

    async function loadPatients() {
        try {
            const data = await getPatients();
            setPatients(data);
        } catch (e) {
            setError("Could not load patients.");
        }
    }

    useEffect(() => {
        loadPatients();
    }, []);

    async function handleCreatePatient(patient) {
        try {
            await createPatient(patient);
            setIsFormOpen(false);
            await loadPatients();
        } catch (e) {
            setError("Could not create patient.");
        }
    }

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                }}
            >
                <div>
                    <h1>All patients</h1>
                    <p>Manage patients and view their details.</p>
                </div>

                <button
                    onClick={() => setIsFormOpen(true)}
                    style={{
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        borderRadius: "10px",
                        padding: "12px 18px",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}
                >
                    + Add Patient
                </button>
            </div>

            {error && (
                <p style={{ color: "red", marginBottom: "12px" }}>
                    {error}
                </p>
            )}

            <div
                style={{
                    background: "white",
                    borderRadius: "16px",
                    padding: "20px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                }}
            >
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                    }}
                >
                    <thead>
                    <tr
                        style={{
                            background: "#2563eb",
                            color: "white",
                        }}
                    >
                        <th style={thStyle}>Patient</th>
                        <th style={thStyle}>Phone</th>
                        <th style={thStyle}>Detail</th>
                    </tr>
                    </thead>

                    <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.id}>
                            <td style={tdStyle}>{patient.fullName}</td>
                            <td style={tdStyle}>{patient.phone}</td>
                            <td style={tdStyle}>
                                <button
                                    onClick={() => setSelectedPatient(patient)}
                                    style={{
                                        border: "none",
                                        background: "transparent",
                                        color: "#2563eb",
                                        fontWeight: "bold",
                                        cursor: "pointer",
                                    }}
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {patients.length === 0 && (
                    <p style={{ color: "#6b7280", padding: "20px" }}>
                        No patients found.
                    </p>
                )}
            </div>

            {isFormOpen && (
                <PatientForm
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={handleCreatePatient}
                />
            )}

            {selectedPatient && (
                <PatientDetail
                    patient={selectedPatient}
                    onClose={() => setSelectedPatient(null)}
                />
            )}
        </div>
    );
}

const thStyle = {
    textAlign: "left",
    padding: "14px",
};

const tdStyle = {
    padding: "14px",
    borderBottom: "1px solid #e5e7eb",
};

export default Patients;