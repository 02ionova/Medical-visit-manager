import { useEffect, useState } from "react";
import AppointmentForm from "../components/AppointmentForm";
import AppointmentDetail from "../components/AppointmentDetail";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog";
import {
    createAppointment,
    deleteAppointment,
    getAppointments,
    updateAppointment,
} from "../api/appointmentApi";
import { getPatients } from "../api/patientApi";

function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [appointmentToEdit, setAppointmentToEdit] = useState(null);
    const [appointmentToDelete, setAppointmentToDelete] = useState(null);

    const [search, setSearch] = useState("");
    const [dateFilter, setDateFilter] = useState("");

    const [error, setError] = useState("");

    async function loadData() {
        try {
            const appointmentsData = await getAppointments();
            const patientsData = await getPatients();

            setAppointments(appointmentsData);
            setPatients(patientsData);
            setError("");
        } catch (e) {
            setError("Could not load appointments.");
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    function getPatientName(patientId) {
        const patient = patients.find((p) => p.id === patientId);
        return patient ? patient.fullName : "Unknown patient";
    }

    const filteredAppointments = appointments.filter((appointment) => {
        const patientName = getPatientName(appointment.patientId).toLowerCase();
        const type = appointment.type?.toLowerCase() || "";

        const matchesSearch =
            patientName.includes(search.toLowerCase()) ||
            type.includes(search.toLowerCase());

        const matchesDate =
            !dateFilter || appointment.date === dateFilter;

        return matchesSearch && matchesDate;
    });

    async function handleCreateAppointment(appointment) {
        try {
            await createAppointment(appointment);
            setIsFormOpen(false);
            await loadData();
        } catch (e) {
            throw e;
        }
    }

    async function handleUpdateAppointment(appointment) {
        try {
            await updateAppointment(appointmentToEdit.id, appointment);
            setAppointmentToEdit(null);
            await loadData();
        } catch (e) {
            throw e;
        }
    }

    async function handleConfirmDelete() {
        try {
            await deleteAppointment(appointmentToDelete.id);
            setAppointmentToDelete(null);
            await loadData();
        } catch (e) {
            setError("Could not delete appointment.");
        }
    }

    return (
        <div>
            <div style={pageHeaderStyle}>
                <div>
                    <h1 style={{ marginBottom: "8px" }}>All appointments</h1>
                    <p style={{ color: "#64748b" }}>
                        Manage medical visits and planned procedures.
                    </p>
                </div>

                <button
                    onClick={() => setIsFormOpen(true)}
                    style={addButtonStyle}
                >
                    + Add Appointment
                </button>
            </div>

            <div style={filterBarStyle}>
                <input
                    type="text"
                    placeholder="Search by patient or procedure type..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={searchInputStyle}
                />

                <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    style={dateInputStyle}
                />

                <button
                    onClick={() => {
                        setSearch("");
                        setDateFilter("");
                    }}
                    style={clearButtonStyle}
                >
                    Clear filters
                </button>
            </div>

            {error && (
                <p style={{ color: "#ef4444", marginBottom: "12px" }}>
                    {error}
                </p>
            )}

            <div style={tableContainerStyle}>
                <table style={tableStyle}>
                    <thead>
                    <tr style={{ background: "#2563eb", color: "white" }}>
                        <th style={thStyle}>Type</th>
                        <th style={thStyle}>Date</th>
                        <th style={thStyle}>From</th>
                        <th style={thStyle}>To</th>
                        <th style={thStyle}>Patient</th>
                        <th style={thStyle}>Price</th>
                        <th style={thStyle}>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {filteredAppointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td style={tdStyle}>{appointment.type}</td>
                            <td style={tdStyle}>{appointment.date}</td>
                            <td style={tdStyle}>{appointment.from}</td>
                            <td style={tdStyle}>{appointment.to}</td>
                            <td style={tdStyle}>
                                {getPatientName(appointment.patientId)}
                            </td>
                            <td style={tdStyle}>${appointment.price}</td>
                            <td style={tdStyle}>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <button
                                        onClick={() => setSelectedAppointment(appointment)}
                                        style={viewButtonStyle}
                                    >
                                        View
                                    </button>

                                    <button
                                        onClick={() => setAppointmentToEdit(appointment)}
                                        style={editButtonStyle}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => setAppointmentToDelete(appointment)}
                                        style={deleteButtonStyle}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {filteredAppointments.length === 0 && (
                    <div style={emptyStateStyle}>
                        No appointments found.
                    </div>
                )}
            </div>

            {isFormOpen && (
                <AppointmentForm
                    patients={patients}
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={handleCreateAppointment}
                />
            )}

            {appointmentToEdit && (
                <AppointmentForm
                    patients={patients}
                    appointment={appointmentToEdit}
                    onClose={() => setAppointmentToEdit(null)}
                    onSubmit={handleUpdateAppointment}
                />
            )}

            {selectedAppointment && (
                <AppointmentDetail
                    appointment={selectedAppointment}
                    patientName={getPatientName(selectedAppointment.patientId)}
                    onClose={() => setSelectedAppointment(null)}
                />
            )}

            {appointmentToDelete && (
                <DeleteConfirmDialog
                    title="Delete appointment"
                    message={`Are you sure you want to delete ${appointmentToDelete.type} for ${getPatientName(
                        appointmentToDelete.patientId
                    )}?`}
                    onCancel={() => setAppointmentToDelete(null)}
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

const filterBarStyle = {
    display: "flex",
    gap: "14px",
    marginBottom: "20px",
    alignItems: "center",
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

const dateInputStyle = {
    padding: "14px 16px",
    borderRadius: "14px",
    border: "1px solid #dbeafe",
    background: "white",
    fontSize: "15px",
    outline: "none",
};

const clearButtonStyle = {
    padding: "14px 18px",
    border: "none",
    borderRadius: "14px",
    background: "#e2e8f0",
    color: "#1e293b",
    fontWeight: "600",
    cursor: "pointer",
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

export default Appointments;