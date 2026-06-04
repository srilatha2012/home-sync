import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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
    
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                setMessage(data.message); //Login Successful
                setErrorMessage([]);
                // setLoginFormData({
                //     // username: "",
                //     email: "",
                //     password: ""
                // });
                
                //navigate("/dashboard"); Navbar may not re-read localStorage immediately
                {/* 
                    1. Browser-level navigation
                    2. Reloads the whole app
                    3. Navbar reads localStorage fresh
                */}
                window.location.href = "/dashboard"
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
            >
                <h1 className="text-3xl font-bold text-center text-indigo-600 mb-2">
                    HomeSync
                </h1>

                <h2 className="text-xl font-semibold text-center mb-6">
                    Login
                </h2>

                {message && (
                    <p className="bg-green-100 text-green-700 px-3 py-2 rounded mb-4">
                        {message}
                    </p>
                )}

                {errorMessage.length > 0 && (
                    <ul className="bg-red-100 text-red-700 px-3 py-2 rounded mb-4">
                        {errorMessage.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                )}

                <input
                    className="w-full border rounded px-3 py-2 mb-4"
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={loginFormData.email}
                    onChange={handleChange}
                />

                <input
                    className="w-full border rounded px-3 py-2 mb-4"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={loginFormData.password}
                    onChange={handleChange}
                />

                <button
                    className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                    type="submit"
                >
                    Login
                </button>
                <p className="text-center mt-4 text-gray-600">
                    Don't have an account?
                </p>

                <p className="text-center">
                    <Link to="/register" className="text-indigo-600 hover:underline">
                        Create an account
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default LoginForm;