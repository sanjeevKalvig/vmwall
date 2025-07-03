// src/AuthGate.jsx
import { useEffect, useState } from "react";
import Login from "./Login";

export default function AuthGate({ children }) {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("auth");
        setAuthenticated(token === "true");
    }, []);

    return authenticated ? (
        <>
            <button
                onClick={async () => {
                    await fetch("http://localhost:8080/3DStudio/api/logout", {
                        method: "POST",
                        credentials: "include",
                    });
                    setAuthenticated(false); // return to login
                }}
                style={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    padding: "6px 12px",
                    background: "#f33",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    zIndex: 1000,
                }}
            >
                Logout
            </button>
            {children}
        </>
    ) : (
        <Login onLogin={() => setAuthenticated(true)} />
    );

}
