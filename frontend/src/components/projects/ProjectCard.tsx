import { useState } from "react";
import CreateTaskForm from "../tasks/CreateTaskForm";
import TaskItem from "../tasks/TaskItem";

type Project = {
    _id: string;
    title: string;
    description?: string;
    category: string;
    status: string;
    dueDate?: string;
};

type Task = {
    _id: string;
    title: string;
    description?: string;
    priority: string;
    status: string;
    dueDate?: string;
};

type ProjectCardProps = {
    project: Project;
    tasks: Task[];
    onTaskCreated: () => void;
    onProjectChanged: () => void;
};

function ProjectCard({ project, tasks, onTaskCreated, onProjectChanged }: ProjectCardProps) {
    const token = localStorage.getItem("token");

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(project.title);
    const [description, setDescription] = useState(project.description || "");
    const [category, setCategory] = useState(project.category);
    const [status, setStatus] = useState(project.status);
    const [dueDate, setDueDate] = useState(
        project.dueDate ? project.dueDate.slice(0, 10) : ""
    );
    const [taskFilter, setTaskFilter] = useState("all");
    // task progress
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.status === 'done').length;
    const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    const filteredTasks = taskFilter === "all" ? tasks : tasks.filter((task) => task.status === taskFilter);


    //Update project
    async function handleUpdateProject(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const response = await fetch(`http://localhost:3000/api/projects/${project._id}`, {
            method: "PUT",
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

        const data = await response.json();
        console.log(data);
        if (response.ok) {
            setIsEditing(false);
            onProjectChanged();
            //onTaskCreated();
        }
    }

    //delete project
    async function handleDeleteProject() {
        const confirmDelete = window.confirm("Are you sure you want to delete this project?");

        if (!confirmDelete) return;
        const response = await fetch(`http://localhost:3000/api/projects/${project._id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            onProjectChanged();
            //onTaskCreated();
        }
    }

    // delete task
    async function handleDeleteTask(taskId: string) {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmDelete) return;
        const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            onTaskCreated();
        }
    }
    //edit
    if (isEditing) {
        return (
            <form
                onSubmit={handleUpdateProject}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6 space-y-3"
            >
                <h4 className="text-xl font-bold mb-3">Edit Project</h4>

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
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="study">Study</option>
                    <option value="job">Job</option>
                    <option value="school">School</option>
                    <option value="home">Home</option>
                    <option value="personal">Personal</option>
                    <option value="other">Other</option>
                </select>

                <select
                    className="w-full border rounded px-3 py-2"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="not-started">Not Started</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="paused">Paused</option>
                </select>

                <input
                    className="w-full border rounded px-3 py-2"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />

                <div className="flex gap-2">
                    <button
                        className="bg-green-600 text-white px-3 py-1 rounded"
                        type="submit"
                    >
                        Save Project
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
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
            <h4 className="text-2xl font-bold mb-3">{title}</h4>
            <p>{description}</p>
            <p>Category: {category}</p>
            <p>
                Status:{" "}
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                    {status}
                </span>
            </p>

            {dueDate && (
                <p>Due Date: {new Date(dueDate).toLocaleDateString()}</p>
            )}
            <div className="flex gap-2 mt-3">
                <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => setIsEditing(true)}>Edit Project</button>

                <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={handleDeleteProject}>
                    Delete Project
                </button>
            </div>
            <div className="border rounded-md p-3 mt-3 bg-gray-50">
                <p>
                    Progress: {completedTasks} / {totalTasks} tasks completed ({progress}%)
                </p>

                {progress === 100 && totalTasks > 0 && (
                    <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded text-sm my-2">
                        🎉 Project Complete
                    </span>
                )}

                <div
                    style={{
                        width: "100%",
                        backgroundColor: "#ddd",
                        height: "20px",
                        borderRadius: "10px",
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            width: `${progress}%`,
                            backgroundColor: "green",
                            height: "100%",
                        }}
                    ></div>
                </div>
            </div>
            <CreateTaskForm
                projectId={project._id}
                onTaskCreated={onTaskCreated}
            />
            <h5 className="font-semibold text-lg mt-5 mb-3">Tasks</h5>
            <div className="flex gap-2 mt-4 mb-3">
                <button
                    className={`px-3 py-1 rounded ${taskFilter === "all"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700"
                        }`}
                    onClick={() => setTaskFilter("all")}
                >
                    All
                </button>

                <button
                    className={`px-3 py-1 rounded ${taskFilter === "todo"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700"
                        }`}
                    onClick={() => setTaskFilter("todo")}
                >
                    To Do
                </button>

                <button
                    className={`px-3 py-1 rounded ${taskFilter === "in-progress"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700"
                        }`}
                    onClick={() => setTaskFilter("in-progress")}
                >
                    In Progress
                </button>

                <button
                    className={`px-3 py-1 rounded ${taskFilter === "done"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700"
                        }`}
                    onClick={() => setTaskFilter("done")}
                >
                    Done
                </button>
            </div>


            {filteredTasks.length === 0 ? (
                <p className="text-gray-500">
                    {taskFilter === "all"
                        ? "No tasks yet."
                        : "No tasks match this filter."}
                </p>
            ) : (
                filteredTasks.map((task) => (
                    <div
                        key={task._id}
                        className="mb-3">
                        <TaskItem
                            task={task}
                            onTaskUpdated={onTaskCreated}
                            onTaskDeleted={() => handleDeleteTask(task._id)}
                        />
                    </div>
                ))
            )}
        </div>
    );
}

export default ProjectCard;