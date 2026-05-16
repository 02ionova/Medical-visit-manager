const patients = [
    {
        id: "1",
        fullName: "Anna Novak",
        phone: "+420 771 293 480",
    },
    {
        id: "2",
        fullName: "John Smith",
        phone: "+420 279 238 910",
    },
    {
        id: "3",
        fullName: "Petra Svobodova",
        phone: "+420 109 302 334",
    },
];

function Patients() {
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <div>
                    <h1>All patients</h1>
                    <p>Manage patients and view their details.</p>
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
                    + Add Patient
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
                        <th style={thStyle}>Patient</th>
                        <th style={thStyle}>Phone</th>
                        <th style={thStyle}>Detail</th>
                    </tr>
                    </thead>

                    <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.id}>
                            <td style={tdStyle}>{patient.fullName}</td>
                            <td style={tdStyle}>{patient.phone}</td>
                            <td style={tdStyle}>View</td>
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

export default Patients;