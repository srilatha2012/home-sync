import { useState } from "react";

type Task = {
    _id: string;
    title: string;
    description?: string;
    priority: string;
    status: string;
    dueDate?: string;
};

type TaskItemProps = {
    task: Task;
    onTaskUpdated: () => void;
    onTaskDeleted: () => void;
};

function TaskItem({ task, onTaskUpdated, onTaskDeleted }: TaskItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description || "");
    const [priority, setPriority] = useState(task.priority);
    const [status, setStatus] = useState(task.status);
    const [dueDate, setDueDate] = useState(
        task.dueDate ? task.dueDate.slice(0, 10) : ""
    );

    async function handleUpdateTask(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:3000/api/tasks/${task._id}`, {
            method: "PUT",
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
            }),
        });

        if (response.ok) {
            setIsEditing(false);
            onTaskUpdated();
        }
    }

    if (isEditing) {
        return (
            <form
                onSubmit={handleUpdateTask}
                className="border rounded-md p-4 mb-3 bg-gray-50 space-y-3"
            >
                <input
                    className="w-full border rounded px-3 py-2"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    className="w-full border rounded px-3 py-2"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <select
                    className="w-full border rounded px-3 py-2"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <select
                    className="w-full border rounded px-3 py-2"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                </select>

                <input
                    className="w-full border rounded px-3 py-2"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />

                <div className="flex gap-2">
                    <button className="bg-green-600 text-white px-3 py-1 rounded" type="submit">
                        Save
                    </button>

                    <button
                        className="bg-gray-500 text-white px-3 py-1 rounded"
                        type="button"
                        onClick={() => setIsEditing(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        );
    }

    return (
        <div className="border rounded-md p-4 mb-3 bg-gray-50">
            <h6 className="font-semibold text-md">{task.title}</h6>

            {task.description && (
                <p className="text-gray-600 mt-1">{task.description}</p>
            )}

            <div className="flex gap-2 mt-2">
                <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-sm">
                    Status: {task.status}
                </span>

                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">
                    Priority: {task.priority}
                </span>
            </div>

            {task.dueDate && (
                <p className="text-sm text-gray-600 mt-2">
                    Due Date: {new Date(task.dueDate).toLocaleDateString()}
                </p>
            )}
            <div className="flex gap-2 mt-3">
                <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded mt-3"
                    onClick={() => setIsEditing(true)}
                >
                    Edit Task
                </button>
                <button
                    className="bg-red-500 text-white px-3 py-1 rounded mt-3"
                    onClick={onTaskDeleted}
                >
                    Delete Task
                </button>
            </div>
        </div>
        // <div>
        //   <p>{task.title}</p>
        //   <p>Status: {task.status}</p>
        //   <p>Priority: {task.priority}</p>

        //   <button onClick={() => setIsEditing(true)}>Edit Task</button>
        // </div>
    );
}

export default TaskItem;