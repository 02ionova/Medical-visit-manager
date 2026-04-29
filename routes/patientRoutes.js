const express = require("express");
const patientDao = require("../dao/patientDao");

const router = express.Router();

function validatePatient(patient) {
    const errors = [];

    if (!patient.fullName) errors.push("fullName is required");
    if (!patient.dateOfBirth) errors.push("dateOfBirth is required");
    if (!patient.phone) errors.push("phone is required");
    if (!patient.address) errors.push("address is required");

    return errors;
}

// Create patient
router.post("/", (req, res) => {
    const errors = validatePatient(req.body);

    if (errors.length > 0) {
        return res.status(400).json({
            code: "invalidDtoIn",
            message: "DtoIn is not valid.",
            errors,
        });
    }

    const patient = patientDao.create(req.body);
    res.status(201).json(patient);
});

// List patients
router.get("/", (req, res) => {
    const patients = patientDao.list();
    res.json({
        itemList: patients,
        total: patients.length,
    });
});

// Get patient by id
router.get("/:id", (req, res) => {
    const patient = patientDao.get(req.params.id);

    if (!patient) {
        return res.status(404).json({
            code: "patientNotFound",
            message: "Patient does not exist.",
        });
    }

    res.json(patient);
});

// Update patient
router.put("/:id", (req, res) => {
    const updatedPatient = patientDao.update(req.params.id, req.body);

    if (!updatedPatient) {
        return res.status(404).json({
            code: "patientNotFound",
            message: "Patient does not exist.",
        });
    }

    res.json(updatedPatient);
});

// Delete patient
router.delete("/:id", (req, res) => {
    const deleted = patientDao.remove(req.params.id);

    if (!deleted) {
        return res.status(404).json({
            code: "patientNotFound",
            message: "Patient does not exist.",
        });
    }

    res.status(204).send();
});

module.exports = router;