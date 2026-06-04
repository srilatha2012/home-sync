import { useState } from "react";
import { API_URL } from "../../config";

type CreateProjectFormProps = {
  onProjectCreated: () => void;
};

function CreateProjectForm({ onProjectCreated }: CreateProjectFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("personal");
  const [status, setStatus] = useState("not-started");
  const [dueDate, setDueDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) {
      setErrorMessage("Project title is required");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          category,
          status,
          dueDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      setTitle("");
      setDescription("");
      setCategory("personal");
      setStatus("not-started");
      setDueDate("");
      setErrorMessage("");

      onProjectCreated();
    } catch (error) {
      setErrorMessage("Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
  
      {errorMessage && <p>{errorMessage}</p>}

      <input
       className="border rounded p-2 w-full"
        type="text"
        placeholder="Project title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br/>
      <input
      className="border rounded p-2 w-full"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br/>
      <select className="border rounded p-2 w-full" value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="study">Study</option>
        <option value="job">Job</option>
        <option value="school">School</option>
        <option value="home">Home</option>
        <option value="personal">Personal</option>
        <option value="other">Other</option>
      </select>
      <br/>
      <select  className="border rounded p-2 w-full" value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="not-started">Not Started</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="paused">Paused</option>
      </select>
      <br/>
      <input
        type="date"
        className="border rounded p-2 w-full"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <br/>
      <button  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700" type="submit">Create Project</button>
    </form>
  );
}

export default CreateProjectForm;