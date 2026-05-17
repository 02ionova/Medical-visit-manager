import { useEffect, useState } from "react";
import { getPatients } from "../api/patientApi";
import { getAppointments } from "../api/appointmentApi";

function Dashboard() {
    const [patients, setPatients] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        async function loadDashboardData() {
            const patientsData = await getPatients();
            const appointmentsData = await getAppointments();

            setPatients(patientsData);
            setAppointments(appointmentsData);
        }

        loadDashboardData();

        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const today = now.toISOString().slice(0, 10);

    const todayAppointments = appointments.filter(
        (appointment) => appointment.date === today
    );

    const plannedCount = appointments.filter(
        (appointment) => (appointment.status || "Planned") === "Planned"
    ).length;

    const completedCount = appointments.filter(
        (appointment) => appointment.status === "Completed"
    ).length;

    const cancelledCount = appointments.filter(
        (appointment) => appointment.status === "Cancelled"
    ).length;

    const appointmentTypes = appointments.reduce((acc, appointment) => {
        acc[appointment.type] = (acc[appointment.type] || 0) + 1;
        return acc;
    }, {});

    return (
        <div>
            <HeaderClock now={now} />

            <div style={cardGridStyle}>
                <DashboardCard title="Total Patients" value={patients.length} />
                <DashboardCard title="Total Appointments" value={appointments.length} />
                <DashboardCard
                    title="Today Appointments"
                    value={todayAppointments.length}
                />
            </div>

            <div style={statusGridStyle}>
                <StatusCard title="Planned" value={plannedCount} color="#2563eb" />
                <StatusCard title="Completed" value={completedCount} color="#10b981" />
                <StatusCard title="Cancelled" value={cancelledCount} color="#ef4444" />
            </div>

            <div style={mainGridStyle}>
                <section style={panelStyle}>
                    <h2>Appointments by Type</h2>
                    <PieChart data={appointmentTypes} />
                </section>

                <section style={panelStyle}>
                    <TodayWidget appointments={todayAppointments} patients={patients} />
                </section>

                <section style={panelStyle}>
                    <h2>European Time</h2>

                    <div style={clockGridStyle}>
                        <AnalogClock city="Prague" timeZone="Europe/Prague" now={now} />
                        <AnalogClock city="London" timeZone="Europe/London" now={now} />
                        <AnalogClock city="Paris" timeZone="Europe/Paris" now={now} />
                        <AnalogClock city="Berlin" timeZone="Europe/Berlin" now={now} />
                    </div>
                </section>

                <section style={panelStyle}>
                    <UpcomingAppointments
                        appointments={appointments}
                        patients={patients}
                        now={now}
                    />
                </section>
            </div>
        </div>
    );
}

function HeaderClock({ now }) {
    const date = now.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const timeParts = now
        .toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        })
        .split(":");

    return (
        <section style={clockHeaderStyle}>
            <div>
                <p style={{ color: "#dbeafe", marginBottom: "8px" }}>Today</p>

                <h1 style={{ color: "white", fontSize: "34px", margin: 0 }}>
                    {date}
                </h1>

                <p style={{ color: "#bfdbfe", marginTop: "10px" }}>
                    Medical Visit Manager dashboard
                </p>
            </div>

            <div style={flipClockStyle}>
                {timeParts.map((part, index) => (
                    <div key={index} style={{ display: "flex", alignItems: "center" }}>
                        <div style={flipBoxStyle}>{part}</div>

                        {index < timeParts.length - 1 && (
                            <span
                                style={{
                                    color: "white",
                                    fontSize: "34px",
                                    margin: "0 8px",
                                }}
                            >
                :
              </span>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

function DashboardCard({ title, value }) {
    return (
        <div style={cardStyle}>
            <p style={{ color: "#64748b", marginBottom: "10px" }}>{title}</p>
            <h2 style={{ fontSize: "36px", margin: 0 }}>{value}</h2>
        </div>
    );
}

function StatusCard({ title, value, color }) {
    return (
        <div style={statusCardStyle}>
            <div
                style={{
                    ...statusDotStyle,
                    background: color,
                }}
            />

            <div>
                <p style={{ color: "#64748b", marginBottom: "8px" }}>{title}</p>
                <h2 style={{ fontSize: "30px", margin: 0, color }}>{value}</h2>
            </div>
        </div>
    );
}

function PieChart({ data }) {
    const entries = Object.entries(data);
    const total = entries.reduce((sum, [, value]) => sum + value, 0);

    if (entries.length === 0) {
        return <p style={{ color: "#64748b" }}>No data available.</p>;
    }

    const colors = [
        "#2563eb",
        "#10b981",
        "#f59e0b",
        "#ef4444",
        "#8b5cf6",
        "#06b6d4",
    ];

    let current = 0;

    const gradient = entries
        .map(([, value], index) => {
            const start = current;
            const end = current + (value / total) * 100;
            current = end;

            return `${colors[index % colors.length]} ${start}% ${end}%`;
        })
        .join(", ");

    return (
        <div style={pieWrapperStyle}>
            <div
                style={{
                    ...pieStyle,
                    background: `conic-gradient(${gradient})`,
                }}
            >
                <div style={pieCenterStyle}>{total}</div>
            </div>

            <div style={{ flex: 1 }}>
                {entries.map(([label, value], index) => (
                    <div key={label} style={legendRowStyle}>
            <span
                style={{
                    ...legendDotStyle,
                    background: colors[index % colors.length],
                }}
            />

                        <span>{label}</span>
                        <strong>{value}</strong>
                    </div>
                ))}
            </div>
        </div>
    );
}

function UpcomingAppointments({ appointments, patients, now }) {
    const today = now.toISOString().slice(0, 10);

    const upcoming = appointments
        .filter((appointment) => appointment.date >= today)
        .sort((a, b) => `${a.date}T${a.from}`.localeCompare(`${b.date}T${b.from}`))
        .slice(0, 4);

    function getPatientName(patientId) {
        const patient = patients.find((p) => p.id === patientId);
        return patient ? patient.fullName : "Unknown patient";
    }

    return (
        <div>
            <h2>Upcoming Appointments</h2>

            <p style={{ color: "#64748b", marginBottom: "18px" }}>
                Next planned visits in the schedule
            </p>

            {upcoming.length === 0 ? (
                <div style={emptyTodayStyle}>No upcoming appointments.</div>
            ) : (
                <div style={upcomingListStyle}>
                    {upcoming.map((appointment) => (
                        <div key={appointment.id} style={upcomingItemStyle}>
                            <div>
                                <strong>{appointment.type}</strong>

                                <p style={{ color: "#64748b", margin: "6px 0" }}>
                                    {getPatientName(appointment.patientId)}
                                </p>

                                <p style={{ color: "#64748b", margin: 0 }}>
                                    {appointment.date}, {appointment.from} - {appointment.to}
                                </p>
                            </div>

                            <StatusBadge status={appointment.status || "Planned"} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function TodayWidget({ appointments, patients }) {
    function getPatientName(patientId) {
        const patient = patients.find((p) => p.id === patientId);
        return patient ? patient.fullName : "Unknown patient";
    }

    return (
        <div>
            <h2>Today</h2>

            <p style={{ color: "#64748b", marginBottom: "16px" }}>
                Appointments planned for today
            </p>

            <h3 style={{ fontSize: "42px", margin: "0 0 20px" }}>
                {appointments.length}
            </h3>

            {appointments.length === 0 ? (
                <div style={emptyTodayStyle}>No appointments planned for today.</div>
            ) : (
                <div style={todayListStyle}>
                    {appointments.map((appointment) => (
                        <div key={appointment.id} style={todayItemStyle}>
                            <div>
                                <strong>{appointment.type}</strong>

                                <p style={{ color: "#64748b", margin: "6px 0" }}>
                                    {getPatientName(appointment.patientId)}
                                </p>

                                <p style={{ color: "#64748b", margin: 0 }}>
                                    {appointment.from} - {appointment.to}
                                </p>
                            </div>

                            <StatusBadge status={appointment.status || "Planned"} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function StatusBadge({ status }) {
    const styles = {
        Planned: {
            background: "#dbeafe",
            color: "#1d4ed8",
        },
        Completed: {
            background: "#dcfce7",
            color: "#15803d",
        },
        Cancelled: {
            background: "#fee2e2",
            color: "#b91c1c",
        },
    };

    return (
        <span
            style={{
                ...statusBadgeStyle,
                ...(styles[status] || styles.Planned),
            }}
        >
      {status}
    </span>
    );
}

function AnalogClock({ city, timeZone, now }) {
    const time = new Date(now.toLocaleString("en-US", { timeZone }));

    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours();

    const secondDeg = seconds * 6;
    const minuteDeg = minutes * 6;
    const hourDeg = hours * 30 + minutes * 0.5;

    return (
        <div style={clockCardStyle}>
            <div style={analogClockStyle}>
                <div
                    style={{
                        ...hourHandStyle,
                        transform: `translateX(-50%) rotate(${hourDeg}deg)`,
                    }}
                />

                <div
                    style={{
                        ...minuteHandStyle,
                        transform: `translateX(-50%) rotate(${minuteDeg}deg)`,
                    }}
                />

                <div
                    style={{
                        ...secondHandStyle,
                        transform: `translateX(-50%) rotate(${secondDeg}deg)`,
                    }}
                />

                <div style={clockCenterStyle} />
            </div>

            <p style={{ marginTop: "12px", fontWeight: "600" }}>{city}</p>

            <p style={{ color: "#64748b", marginTop: "4px" }}>
                {time.toLocaleTimeString("en-GB")}
            </p>
        </div>
    );
}

const clockHeaderStyle = {
    background: "linear-gradient(135deg, #1e40af, #3b82f6)",
    borderRadius: "28px",
    padding: "32px",
    marginBottom: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 20px 45px rgba(37, 99, 235, 0.25)",
};

const flipClockStyle = {
    display: "flex",
    alignItems: "center",
};

const flipBoxStyle = {
    background: "#0f172a",
    color: "white",
    fontSize: "38px",
    fontWeight: "700",
    padding: "18px 20px",
    borderRadius: "16px",
    minWidth: "82px",
    textAlign: "center",
    boxShadow: "inset 0 -4px 0 rgba(255,255,255,0.08)",
};

const cardGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginBottom: "20px",
};

const statusGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginBottom: "24px",
};

const mainGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "24px",
};

const cardStyle = {
    background: "white",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
};

const statusCardStyle = {
    background: "white",
    borderRadius: "20px",
    padding: "22px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
};

const statusDotStyle = {
    width: "18px",
    height: "18px",
    borderRadius: "50%",
};

const panelStyle = {
    background: "white",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
};

const pieWrapperStyle = {
    display: "flex",
    alignItems: "center",
    gap: "28px",
    marginTop: "20px",
};

const pieStyle = {
    width: "190px",
    height: "190px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

const pieCenterStyle = {
    width: "92px",
    height: "92px",
    borderRadius: "50%",
    background: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    fontWeight: "700",
};

const legendRowStyle = {
    display: "grid",
    gridTemplateColumns: "18px 1fr auto",
    gap: "10px",
    alignItems: "center",
    padding: "8px 0",
    borderBottom: "1px solid #e5e7eb",
};

const legendDotStyle = {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
};

const upcomingListStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
};

const upcomingItemStyle = {
    background: "#f8fafc",
    borderRadius: "16px",
    padding: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};

const todayListStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
};

const todayItemStyle = {
    background: "#f8fafc",
    borderRadius: "16px",
    padding: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};

const statusBadgeStyle = {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "700",
    whiteSpace: "nowrap",
};

const emptyTodayStyle = {
    background: "#f8fafc",
    borderRadius: "16px",
    padding: "20px",
    color: "#64748b",
};

const clockGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "24px",
    marginTop: "20px",
};

const clockCardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#f8fafc",
    padding: "20px",
    borderRadius: "20px",
};

const analogClockStyle = {
    width: "140px",
    height: "140px",
    borderRadius: "50%",
    border: "8px solid #dbeafe",
    position: "relative",
    background: "white",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
};

const hourHandStyle = {
    position: "absolute",
    width: "5px",
    height: "36px",
    background: "#1e293b",
    top: "34px",
    left: "50%",
    transformOrigin: "bottom",
    borderRadius: "999px",
};

const minuteHandStyle = {
    position: "absolute",
    width: "4px",
    height: "50px",
    background: "#2563eb",
    top: "20px",
    left: "50%",
    transformOrigin: "bottom",
    borderRadius: "999px",
};

const secondHandStyle = {
    position: "absolute",
    width: "2px",
    height: "56px",
    background: "#ef4444",
    top: "14px",
    left: "50%",
    transformOrigin: "bottom",
};

const clockCenterStyle = {
    position: "absolute",
    width: "12px",
    height: "12px",
    background: "#1e293b",
    borderRadius: "50%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
};

export default Dashboard;