function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <p style={{ color: "#6b7280", marginBottom: "30px" }}>
                Medical Visit Manager overview
            </p>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "20px",
                }}
            >
                <DashboardCard title="Total Patients" value="10" />
                <DashboardCard title="Total Appointments" value="24" />
                <DashboardCard title="Today Appointments" value="5" />
            </div>
        </div>
    );
}

function DashboardCard({ title, value }) {
    return (
        <div
            style={{
                background: "white",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            }}
        >
            <p style={{ color: "#6b7280", marginBottom: "10px" }}>{title}</p>
            <h2 style={{ fontSize: "36px", margin: 0 }}>{value}</h2>
        </div>
    );
}

export default Dashboard;