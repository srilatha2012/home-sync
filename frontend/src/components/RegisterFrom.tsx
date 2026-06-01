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

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
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
        console.log("data==>",data);
        }catch(error) {

        }
     
    }
    function handleChange(e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
        const { name, value } = e.target;
        console.log("handleChange",name, value);
        setFormData({
            ...formData,
            [name]: value
        }
        )
    }
    return (
        <form onSubmit={handleSubmit}>
            <h1>Registration</h1>
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