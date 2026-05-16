import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav
            style={{
                width: "220px",
                background: "#2563eb",
                color: "white",
                padding: "30px"
            }}
        >
            <h2>Medical Manager</h2>

            <ul style={{ listStyle: "none", padding: 0 }}>
                <li style={{ margin: "20px 0" }}>
                    <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                        Dashboard
                    </Link>
                </li>

                <li style={{ margin: "20px 0" }}>
                    <Link
                        to="/patients"
                        style={{ color: "white", textDecoration: "none" }}
                    >
                        Patients
                    </Link>
                </li>

                <li style={{ margin: "20px 0" }}>
                    <Link
                        to="/appointments"
                        style={{ color: "white", textDecoration: "none" }}
                    >
                        Appointments
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;