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
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                }}
            >
                <div>
                    <h1>All appointments</h1>
                    <p>Manage medical visits and planned procedures.</p>
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
                    + Add Appointment
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
                    overflowX: "auto",
                }}
            >
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
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
                    {appointments.map((appointment) => (
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
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {appointments.length === 0 && (
                    <p style={{ color: "#6b7280", padding: "20px" }}>
                        No appointments found.
                    </p>
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

const thStyle = {
    textAlign: "left",
    padding: "14px",
};

const tdStyle = {
    padding: "14px",
    borderBottom: "1px solid #e5e7eb",
};

const viewButtonStyle = {
    border: "none",
    background: "#2563eb",
    color: "white",
    borderRadius: "8px",
    padding: "8px 12px",
    cursor: "pointer",
    marginRight: "8px",
};

const editButtonStyle = {
    border: "none",
    background: "#f59e0b",
    color: "white",
    borderRadius: "8px",
    padding: "8px 12px",
    cursor: "pointer",
    marginRight: "8px",
};

const deleteButtonStyle = {
    border: "none",
    background: "#ef4444",
    color: "white",
    borderRadius: "8px",
    padding: "8px 12px",
    cursor: "pointer",
};

export default Appointments;