const express = require("express");
const cors = require("cors");

const patientRoutes = require("./routes/patientRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Medical Visit Manager backend is running",
    });
});

app.use("/patients", patientRoutes);
app.use("/appointments", appointmentRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});