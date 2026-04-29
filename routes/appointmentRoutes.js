const express = require("express");
const appointmentDao = require("../dao/appointmentDao");

const router = express.Router();

function validateAppointment(a) {
    const errors = [];

    if (!a.date) errors.push("date is required");
    if (!a.from) errors.push("from is required");
    if (!a.to) errors.push("to is required");
    if (!a.type) errors.push("type is required");
    if (!a.price) errors.push("price is required");
    if (!a.patientId) errors.push("patientId is required");

    return errors;
}

// Create
router.post("/", (req, res) => {
    const errors = validateAppointment(req.body);

    if (errors.length > 0) {
        return res.status(400).json({
            code: "invalidDtoIn",
            errors,
        });
    }

    try {
        const appointment = appointmentDao.create(req.body);
        res.status(201).json(appointment);
    } catch (e) {
        res.status(400).json(e);
    }
});

// List
router.get("/", (req, res) => {
    const list = appointmentDao.list();
    res.json({
        itemList: list,
        total: list.length,
    });
});

// Get by id
router.get("/:id", (req, res) => {
    const a = appointmentDao.get(req.params.id);

    if (!a) {
        return res.status(404).json({
            code: "appointmentNotFound",
        });
    }

    res.json(a);
});

// Delete
router.delete("/:id", (req, res) => {
    const ok = appointmentDao.remove(req.params.id);

    if (!ok) {
        return res.status(404).json({
            code: "appointmentNotFound",
        });
    }

    res.status(204).send();
});

// Get appointments by patient
router.get("/patient/:patientId", (req, res) => {
    const all = appointmentDao.list();

    const filtered = all.filter(
        (a) => a.patientId === req.params.patientId
    );

    res.json({
        itemList: filtered,
        total: filtered.length,
    });
});

module.exports = router;