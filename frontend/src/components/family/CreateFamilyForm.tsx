import { useState } from "react"
import { API_URL } from "../../config";

type CreateFamilyFormProps = {
  onFamilyCreated: () => void;
};
//Family form
function CreateFamilyForm({ onFamilyCreated }: CreateFamilyFormProps) {
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

            const response = await fetch(`${API_URL}/api/families/`, {
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
                 onFamilyCreated();
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
        <form onSubmit={handleSubmit} className="space-y-4">
        
            {message && (
                <p className="bg-green-100 text-green-700 px-3 py-2 rounded">
                    {message}
                </p>
            )}

            {errorMessage && (
                <p className="bg-red-100 text-red-700 px-3 py-2 rounded">
                    {errorMessage}
                </p>
            )}

            <input
                className="w-full border rounded px-3 py-2"
                type="text"
                name="familyName"
                placeholder="Enter family name"
                value={familyName}
                onChange={(event) => setFamilyName(event.target.value)}
            />

            <button
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                type="submit"
            >
                Add Family
            </button>
        </form>
    );
}

export default CreateFamilyForm