import { Link, useLocation } from "react-router-dom";

function NavBar() {
    const location = useLocation();

    return (
        <nav
            style={{
                width: "260px",
                background: "#1e40af",
                color: "white",
                padding: "32px 24px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
            }}
        >
            <div>
                <h1 style={{ fontSize: "24px", marginBottom: "8px" }}>
                    Medical Manager
                </h1>

                <p style={{ color: "#bfdbfe" }}>
                    Healthcare administration
                </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <NavItem
                    to="/"
                    label="Dashboard"
                    active={location.pathname === "/"}
                />

                <NavItem
                    to="/patients"
                    label="Patients"
                    active={location.pathname === "/patients"}
                />

                <NavItem
                    to="/appointments"
                    label="Appointments"
                    active={location.pathname === "/appointments"}
                />
            </div>
        </nav>
    );
}

function NavItem({ to, label, active }) {
    return (
        <Link
            to={to}
            style={{
                textDecoration: "none",
                color: "white",
                padding: "14px 16px",
                borderRadius: "12px",
                background: active ? "#2563eb" : "transparent",
                transition: "0.2s",
                fontWeight: active ? "600" : "500",
            }}
        >
            {label}
        </Link>
    );
}

export default NavBar;