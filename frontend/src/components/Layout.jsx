import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function Layout() {
    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <NavBar />

            <main
                style={{
                    flex: 1,
                    padding: "30px",
                    background: "#f5f7fb"
                }}
            >
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;