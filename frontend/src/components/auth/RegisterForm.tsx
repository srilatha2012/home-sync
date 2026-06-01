import { useState } from "react";

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
        if(!formData.username.trim()) {
            setErrorMessage(["Username is required!!"]);
            return;
        }
        if(!formData.email.trim()) {
            setErrorMessage(["Email is required"]);
            return;
        }
        if(formData.password.length <8) {
            setErrorMessage(["Password must be at least 8 character"]);
            return;
        }
        console.log("handleSubmit", formData);
        try {
            const response = await fetch("http://localhost:3000/api/users/register", {
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
        <form onSubmit={handleSubmit}>
            <h1>Registration</h1>
            {message && <p>{message}</p>}
            {errorMessage.length > 0  &&  (
                <ul>
                    {errorMessage.map((error,index)=> (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            )}
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
            />
            <br />
            <input
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />
            <br />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
            />
            <br />
            <select name="role" onChange={handleChange} value={formData.role}>
                <option value="parent">Parent</option>
                <option value="spouse">Spouse</option>
                <option value="teen">Teen</option>
                <option value="child">Child</option>
            </select>
            <br />
            <button type="submit">Register</button>
        </form>
    );
}

export default RegisterForm;