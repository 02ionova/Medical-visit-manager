const API_URL = "http://localhost:3000/appointments";

export async function getAppointments() {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.itemList;
}

export async function getAppointmentsByPatient(patientId) {
    const response = await fetch(`${API_URL}/patient/${patientId}`);
    const data = await response.json();
    return data.itemList;
}

export async function createAppointment(appointment) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(appointment),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create appointment");
    }

    return response.json();
}