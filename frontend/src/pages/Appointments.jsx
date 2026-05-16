const appointments = [
    {
        id: "1",
        type: "IV drip",
        date: "2025-04-05",
        from: "09:30",
        to: "10:00",
        patient: "Anna Novak",
        price: 500,
    },
    {
        id: "2",
        type: "Injection",
        date: "2025-04-07",
        from: "10:00",
        to: "10:30",
        patient: "John Smith",
        price: 200,
    },
    {
        id: "3",
        type: "Blood test",
        date: "2025-04-11",
        from: "19:00",
        to: "19:10",
        patient: "Petra Svobodova",
        price: 100,
    },
    {
        id: "4",
        type: "Check-up",
        date: "2025-04-15",
        from: "11:30",
        to: "12:00",
        patient: "Martin Dvorak",
        price: 800,
    },
];

function Appointments() {
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <div>
                    <h1>All appointments</h1>
                    <p>Manage medical visits and planned procedures.</p>
                </div>

                <button
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

            <div
                style={{
                    background: "white",
                    borderRadius: "16px",
                    padding: "20px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
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
                    </tr>
                    </thead>

                    <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td style={tdStyle}>{appointment.type}</td>
                            <td style={tdStyle}>{appointment.date}</td>
                            <td style={tdStyle}>{appointment.from}</td>
                            <td style={tdStyle}>{appointment.to}</td>
                            <td style={tdStyle}>{appointment.patient}</td>
                            <td style={tdStyle}>${appointment.price}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
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

export default Appointments;