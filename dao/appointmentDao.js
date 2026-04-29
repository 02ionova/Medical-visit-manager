const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const filePath = path.join(__dirname, "../data/appointments.json");

function readData() {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
}

function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Проверка пересечения времени
function isOverlapping(newAppointment, existingAppointments) {
    return existingAppointments.some((a) => {
        if (a.date !== newAppointment.date) return false;

        return (
            newAppointment.from < a.to &&
            newAppointment.to > a.from
        );
    });
}

function create(appointment) {
    const appointments = readData();

    // Проверка времени
    if (appointment.to <= appointment.from) {
        throw {
            code: "invalidTimeInterval",
            message: "End time must be after start time",
        };
    }

    // Проверка пересечения
    if (isOverlapping(appointment, appointments)) {
        throw {
            code: "timeSlotOccupied",
            message: "Selected time slot is already occupied",
        };
    }

    const newAppointment = {
        id: uuidv4(),
        date: appointment.date,
        from: appointment.from,
        to: appointment.to,
        type: appointment.type,
        price: appointment.price,
        note: appointment.note || "",
        patientId: appointment.patientId,
    };

    appointments.push(newAppointment);
    writeData(appointments);

    return newAppointment;
}

function get(id) {
    const appointments = readData();
    return appointments.find((a) => a.id === id);
}

function list() {
    return readData();
}

function update(id, updatedAppointment) {
    const appointments = readData();
    const index = appointments.findIndex((a) => a.id === id);

    if (index === -1) return null;

    appointments[index] = {
        ...appointments[index],
        ...updatedAppointment,
        id,
    };

    writeData(appointments);
    return appointments[index];
}

function remove(id) {
    const appointments = readData();
    const filtered = appointments.filter((a) => a.id !== id);

    if (filtered.length === appointments.length) return false;

    writeData(filtered);
    return true;
}

module.exports = {
    create,
    get,
    list,
    update,
    remove,
};