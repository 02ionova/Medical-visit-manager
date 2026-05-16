const API_URL = "http://localhost:3000/patients";

export async function getPatients() {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.itemList;
}

export async function createPatient(patient) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(patient),
    });

    if (!response.ok) {
        throw new Error("Failed to create patient");
    }

    return response.json();
}

export async function deletePatient(id) {
    const response = await fetch(`http://localhost:3000/patients/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete patient");
    }
}