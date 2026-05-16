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