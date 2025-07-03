import { useState } from "react";

export default function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8080/3DStudio/api/authorization", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "username": username,
                    "password": password,
                },
                credentials: "include", // sends and receives cookies
            });

            const text = await res.text();

            if (res.ok && text.toLowerCase().includes("logged in successfully")) {
                onLogin();
                console.log(text);
                console.log(res.status)
            } else {
                throw new Error(text || "Login failed");
            }
        } catch (err) {
            setError(err.message || "Something went wrong");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20vh" }}>
            <form onSubmit={handleSubmit}>
                <h2>Login to Continue</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /><br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br />
                <button type="submit">Login</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
}
