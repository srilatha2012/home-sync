import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type LoginFormData = {
    // username: string,
    email: string,
    password: string
}


function LoginForm() {

    const navigate = useNavigate();

    const [loginFormData, setLoginFormData] = useState<LoginFormData>({
        //username: "",
        email: "",
        password: ""
    });
    const [message, setMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string[]>([]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("handle form");
        if (!loginFormData.email.trim()) {
            setErrorMessage(["Email is required"]);
            return;
        }
        if (!loginFormData.password.trim()) {
            setErrorMessage(["Password is required"]);
            return;
        }
        try {
            const response = await fetch("http://localhost:3000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginFormData)
            });
            const data = await response.json();
            if (response.ok) {
                console.log("data ====>", data);
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                setMessage(data.message); //Login Successful
                setErrorMessage([]);
                setLoginFormData({
                    // username: "",
                    email: "",
                    password: ""
                });
                navigate("/dashboard");
            } else {
                setMessage("");
                setErrorMessage(data.message || "Login Failed");
            }
        } catch (error) {
            setMessage("");
            setErrorMessage(["Something went wrong Please try again"]);
        }

    }
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setLoginFormData({
            ...loginFormData,
            [name]: value
        });
    }
    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            {message && <p>{message}</p>}
            {errorMessage.length > 0 && (
                <ul>
                    {errorMessage.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}

                </ul>
            )}
            {/* <input
                type="text"
                name="username"
                placeholder="Username"
                value={loginFormData.username}
                onChange={handleChange}
            /> <br /> */}
            <input
                type="text"
                name="email"
                placeholder="Email"
                value={loginFormData.email}
                onChange={handleChange}
            /> <br />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginFormData.password}
                onChange={handleChange}
            /> <br />
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginForm;