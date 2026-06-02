import { useState } from "react"
import type { User } from "../../types";

type FamilyFormProp = {
    user: User;
}

//Family form
function CreateFamilyForm({ user }: FamilyFormProp) {
    const [familyName, setFamilyName] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!familyName.trim()) {
            setErrorMessage("Family name required");
            return;
        }
        console.log({ name: familyName });
        try {
            //backend API call
            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:3000/api/families/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: familyName
                })
            });
            const data = await response.json();
            if (response.ok) {
                console.log("data==form data", data);
                setMessage(data.message);
                setErrorMessage("");
                setFamilyName("");
            } else {
                setMessage("");
                setErrorMessage(data.message || "Failed to create Family");
            }

        } catch (error) {
            setMessage("");
            setErrorMessage("Something went wrong");
        }


    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Family</h2>
            {message && <p>{message}</p>}
            {errorMessage && <p>{errorMessage}</p>}
            <input
                type="text"
                name="familyName"
                placeholder="Enter family name"
                value={familyName}
                onChange={(event) => setFamilyName(event.target.value)}

            />
            <br />
            <button type="submit">Add Family</button>
        </form>
    )
}

export default CreateFamilyForm