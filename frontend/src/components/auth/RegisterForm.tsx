import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../config";

function RegisterForm() {

    type RegisterFormData = {
        username: string,
        email: string,
        password: string,
        role: string
    }

    const [formData, setFormData] = useState<RegisterFormData>({
        username: "",
        email: "",
        password: "",
        role: "parent"
    });


    //set success and error messages
    const [message, setMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string[]>([]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!formData.username.trim()) {
            setErrorMessage(["Username is required!!"]);
            return;
        }
        if (!formData.email.trim()) {
            setErrorMessage(["Email is required"]);
            return;
        }
        if (formData.password.length < 8) {
            setErrorMessage(["Password must be at least 8 character"]);
            return;
        }
        console.log("handleSubmit", formData);
        try {
            const response = await fetch(`${API_URL}/api/users/register`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log("data==>", data);
            if (response.ok) {
                setMessage(data.message); //User added Successfully
                setErrorMessage([]);
                setFormData({
                    username: "",
                    email: "",
                    password: "",
                    role: "parent"
                })

            } else {
                setErrorMessage(data.errors || [data.message]);
                setMessage("");
            }

        } catch (error) {
            setErrorMessage(["Something went wrong"]);
        }

    }
    function handleChange(e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
        const { name, value } = e.target;
        console.log("handleChange", name, value);
        setFormData({
            ...formData,
            [name]: value
        }
        )
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

                <p className="text-center text-gray-500 mb-4">
                    Family Progress Tracker
                </p>

                <h2 className="text-xl font-semibold text-center mb-6">
                    Registration
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
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />

                <input
                    className="w-full border rounded px-3 py-2 mb-4"
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    className="w-full border rounded px-3 py-2 mb-4"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <select
                    className="w-full border rounded px-3 py-2 mb-4"
                    name="role"
                    onChange={handleChange}
                    value={formData.role}
                >
                    <option value="parent">Parent</option>
                    <option value="spouse">Spouse</option>
                    <option value="teen">Teen</option>
                    <option value="child">Child</option>
                </select>

                <button
                    className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                    type="submit"
                >
                    Register
                </button>

                <p className="text-center mt-4 text-gray-600">
                    Already have an account?
                </p>

                <p className="text-center">
                    <Link to="/login" className="text-indigo-600 hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default RegisterForm;