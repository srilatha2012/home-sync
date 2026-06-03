import { useState } from "react";

type CreateTaskFormProps = {
  projectId: string;
  onTaskCreated: () => void;
};

function CreateTaskForm({ projectId, onTaskCreated }: CreateTaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("todo");
  const [dueDate, setDueDate] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        priority,
        status,
        dueDate,
        project: projectId,
      }),
    });

    if (response.ok) {
      setTitle("");
      setDescription("");
      setPriority("medium");
      setStatus("todo");
      setDueDate("");
      onTaskCreated();
    }
  }

  return (
    <div className="mt-4 mb-4">
      <h4 className="font-semibold mb-2">Add Task</h4>

      <form
        className="grid grid-cols-1 md:grid-cols-6 gap-2"
        onSubmit={handleSubmit}
      >
        <input
          className="border rounded px-3 py-2"
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border rounded px-3 py-2"
          type="text"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="border rounded px-3 py-2"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          className="border rounded px-3 py-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <input
          className="border rounded px-3 py-2"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-3 py-2 rounded"
          type="submit"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default CreateTaskForm;