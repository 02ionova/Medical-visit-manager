import { useEffect, useState } from "react";
import {
    deletePatient,
    getPatients,
} from "../api/patientApi";

import {
    getAppointmentsByPatient,
} from "../api/appointmentApi";

import PatientForm from "../components/PatientForm";
import PatientDetail from "../components/PatientDetail";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog";

function Patients() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);

    const [detailPatient, setDetailPatient] = useState(null);

    const [deletePatientData, setDeletePatientData] = useState(null);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    useEffect(() => {
        loadPatients();
    }, []);

    async function loadPatients() {
        try {
            setLoading(true);

            const data = await getPatients();

            setPatients(data);
        } catch (e) {
            setError("Failed to load patients.");
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(patient) {
        try {
            const appointments = await getAppointmentsByPatient(patient.id);

            if (appointments.length > 0) {
                alert(
                    "This patient cannot be deleted because appointments already exist."
                );
                return;
            }

            await deletePatient(patient.id);

            await loadPatients();

            setDeletePatientData(null);
        } catch (e) {
            setError("Failed to delete patient.");
        }
    }

    const filteredPatients = patients.filter((patient) => {
        const fullName = patient.fullName?.toLowerCase() || "";
        const phone = patient.phone?.toLowerCase() || "";

        return (
            fullName.includes(search.toLowerCase()) ||
            phone.includes(search.toLowerCase())
        );
    });

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "24px",
                }}
            >
                <div>
                    <h1 style={{ marginBottom: "8px" }}>All patients</h1>

                    <p style={{ color: "#64748b" }}>
                        Manage patients and view their details.
                    </p>
                </div>

                <button
                    onClick={() => {
                        setSelectedPatient(null);
                        setShowForm(true);
                    }}
                    style={addButtonStyle}
                >
                    + Add Patient
                </button>
            </div>

            <div style={searchContainerStyle}>
                <input
                    type="text"
                    placeholder="Search by patient name or phone..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={searchInputStyle}
                />
            </div>

            {error && (
                <p style={{ color: "#ef4444", marginBottom: "16px" }}>
                    {error}
                </p>
            )}

            <div style={tableContainerStyle}>
                {loading ? (
                    <p>Loading patients...</p>
                ) : filteredPatients.length === 0 ? (
                    <div style={emptyStateStyle}>
                        No patients found.
                    </div>
                ) : (
                    <table style={tableStyle}>
                        <thead>
                        <tr style={{ background: "#2563eb", color: "white" }}>
                            <th style={thStyle}>Patient</th>
                            <th style={thStyle}>Phone</th>
                            <th style={thStyle}>Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        {filteredPatients.map((patient) => (
                            <tr key={patient.id}>
                                <td style={tdStyle}>{patient.fullName}</td>

                                <td style={tdStyle}>{patient.phone}</td>

                                <td style={tdStyle}>
                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <button
                                            style={viewButtonStyle}
                                            onClick={() => setDetailPatient(patient)}
                                        >
                                            View
                                        </button>

                                        <button
                                            style={editButtonStyle}
                                            onClick={() => {
                                                setSelectedPatient(patient);
                                                setShowForm(true);
                                            }}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            style={deleteButtonStyle}
                                            onClick={() =>
                                                setDeletePatientData(patient)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>

            {showForm && (
                <PatientForm
                    patient={selectedPatient}
                    onClose={() => {
                        setShowForm(false);
                        setSelectedPatient(null);
                    }}
                    onSaved={() => {
                        loadPatients();
                        setShowForm(false);
                        setSelectedPatient(null);
                    }}
                />
            )}

            {detailPatient && (
                <PatientDetail
                    patient={detailPatient}
                    onClose={() => setDetailPatient(null)}
                />
            )}

            {deletePatientData && (
                <DeleteConfirmDialog
                    title="Delete patient"
                    message={`Are you sure you want to delete ${deletePatientData.fullName}?`}
                    onCancel={() => setDeletePatientData(null)}
                    onConfirm={() => handleDelete(deletePatientData)}
                />
            )}
        </div>
    );
}

const addButtonStyle = {
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "12px",
    padding: "14px 20px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "14px",
};

const searchContainerStyle = {
    marginBottom: "20px",
};

const searchInputStyle = {
    width: "100%",
    maxWidth: "420px",
    padding: "14px 16px",
    borderRadius: "14px",
    border: "1px solid #dbeafe",
    background: "white",
    fontSize: "15px",
    outline: "none",
    boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
};

const tableContainerStyle = {
    background: "white",
    borderRadius: "24px",
    padding: "28px",
    boxShadow: "0 12px 35px rgba(0,0,0,0.08)",
};

const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
};

const thStyle = {
    textAlign: "left",
    padding: "16px",
    fontWeight: "600",
};

const tdStyle = {
    padding: "18px 16px",
    borderBottom: "1px solid #e5e7eb",
};

const emptyStateStyle = {
    padding: "40px",
    textAlign: "center",
    color: "#64748b",
};

const viewButtonStyle = {
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "10px 14px",
    cursor: "pointer",
    fontWeight: "600",
};

const editButtonStyle = {
    background: "#f59e0b",
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "10px 14px",
    cursor: "pointer",
    fontWeight: "600",
};

const deleteButtonStyle = {
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "10px 14px",
    cursor: "pointer",
    fontWeight: "600",
};

export default Patients;