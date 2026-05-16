import { useEffect, useState } from "react";
import PatientForm from "../components/PatientForm";
import PatientDetail from "../components/PatientDetail";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog";
import {
    createPatient,
    deletePatient,
    getPatients,
    updatePatient,
} from "../api/patientApi";

function Patients() {
    const [patients, setPatients] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patientToEdit, setPatientToEdit] = useState(null);
    const [patientToDelete, setPatientToDelete] = useState(null);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");

    async function loadPatients() {
        try {
            const data = await getPatients();
            setPatients(data);
            setError("");
        } catch (e) {
            setError("Could not load patients.");
        }
    }

    useEffect(() => {
        loadPatients();
    }, []);

    const filteredPatients = patients.filter((patient) => {
        const name = patient.fullName?.toLowerCase() || "";
        const phone = patient.phone?.toLowerCase() || "";
        const query = search.toLowerCase();

        return name.includes(query) || phone.includes(query);
    });

    async function handleCreatePatient(patient) {
        try {
            await createPatient(patient);
            setIsFormOpen(false);
            await loadPatients();
        } catch (e) {
            throw e;
        }
    }

    async function handleUpdatePatient(patient) {
        try {
            await updatePatient(patientToEdit.id, patient);
            setPatientToEdit(null);
            await loadPatients();
        } catch (e) {
            throw e;
        }
    }

    async function handleConfirmDelete() {
        try {
            await deletePatient(patientToDelete.id);
            setPatientToDelete(null);
            await loadPatients();
        } catch (e) {
            setError(e.message);
            setPatientToDelete(null);
        }
    }

    return (
        <div>
            <div style={pageHeaderStyle}>
                <div>
                    <h1 style={{ marginBottom: "8px" }}>All patients</h1>
                    <p style={{ color: "#64748b" }}>
                        Manage patients and view their details.
                    </p>
                </div>

                <button onClick={() => setIsFormOpen(true)} style={addButtonStyle}>
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
                <p style={{ color: "#ef4444", marginBottom: "12px" }}>{error}</p>
            )}

            <div style={tableContainerStyle}>
                <table style={tableStyle}>
                    <thead>
                    <tr style={{ background: "#2563eb", color: "white" }}>
                        <th style={{ ...thStyle, width: "40%" }}>Patient</th>
                        <th style={{ ...thStyle, width: "30%" }}>Phone</th>
                        <th style={{ ...thStyle, width: "30%" }}>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {filteredPatients.map((patient) => (
                        <tr key={patient.id}>
                            <td style={tdStyle}>
                                <strong>{patient.fullName}</strong>
                            </td>

                            <td style={tdStyle}>{patient.phone}</td>

                            <td style={tdStyle}>
                                <div style={actionContainerStyle}>
                                    <button
                                        style={viewButtonStyle}
                                        onClick={() => setSelectedPatient(patient)}
                                    >
                                        View
                                    </button>

                                    <button
                                        style={editButtonStyle}
                                        onClick={() => setPatientToEdit(patient)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        style={deleteButtonStyle}
                                        onClick={() => setPatientToDelete(patient)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {filteredPatients.length === 0 && (
                    <div style={emptyStateStyle}>No patients found.</div>
                )}
            </div>

            {isFormOpen && (
                <PatientForm
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={handleCreatePatient}
                />
            )}

            {patientToEdit && (
                <PatientForm
                    patient={patientToEdit}
                    onClose={() => setPatientToEdit(null)}
                    onSubmit={handleUpdatePatient}
                />
            )}

            {selectedPatient && (
                <PatientDetail
                    patient={selectedPatient}
                    onClose={() => setSelectedPatient(null)}
                />
            )}

            {patientToDelete && (
                <DeleteConfirmDialog
                    title="Delete patient"
                    message={`Are you sure you want to delete ${patientToDelete.fullName}?`}
                    onCancel={() => setPatientToDelete(null)}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </div>
    );
}

const pageHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
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

const tableContainerStyle = {
    background: "white",
    borderRadius: "24px",
    padding: "28px",
    boxShadow: "0 12px 35px rgba(0,0,0,0.08)",
    overflowX: "auto",
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

const actionContainerStyle = {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
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