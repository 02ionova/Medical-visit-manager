const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const filePath = path.join(__dirname, "../data/patients.json");

function readData() {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
}

function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function create(patient) {
    const patients = readData();

    const newPatient = {
        id: uuidv4(),
        fullName: patient.fullName,
        dateOfBirth: patient.dateOfBirth,
        phone: patient.phone,
        address: patient.address,
        note: patient.note || "",
    };

    patients.push(newPatient);
    writeData(patients);

    return newPatient;
}

function get(id) {
    const patients = readData();
    return patients.find((patient) => patient.id === id);
}

function list() {
    return readData();
}

function update(id, updatedPatient) {
    const patients = readData();
    const index = patients.findIndex((patient) => patient.id === id);

    if (index === -1) {
        return null;
    }

    patients[index] = {
        ...patients[index],
        ...updatedPatient,
        id,
    };

    writeData(patients);
    return patients[index];
}

function remove(id) {
    const patients = readData();
    const filteredPatients = patients.filter((patient) => patient.id !== id);

    if (patients.length === filteredPatients.length) {
        return false;
    }

    writeData(filteredPatients);
    return true;
}

module.exports = {
    create,
    get,
    list,
    update,
    remove,
};