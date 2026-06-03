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
};

function ProjectCard({ project, tasks, onTaskCreated }: ProjectCardProps) {
    const token = localStorage.getItem("token");

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(project.title);
    const [description, setDescription] = useState(project.description || "");
    const [category, setCategory] = useState(project.category);
    const [status, setStatus] = useState(project.status);
    const [dueDate, setDueDate] = useState(
        project.dueDate ? project.dueDate.slice(0, 10) : ""
    );
    // task progress
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.status === 'done').length;
    const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100)

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
            onTaskCreated();
        }
    }

    //delete project
    async function handleDeleteProject() {
        const response = await fetch(`http://localhost:3000/api/projects/${project._id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            onTaskCreated();
        }
    }

    // delete task
    async function handleDeleteTask(taskId: string) {
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
            <form onSubmit={handleUpdateProject}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="study">Study</option>
                    <option value="job">Job</option>
                    <option value="school">School</option>
                    <option value="home">Home</option>
                    <option value="personal">Personal</option>
                    <option value="other">Other</option>
                </select>

                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="not-started">Not Started</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="paused">Paused</option>
                </select>

                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />

                <button type="submit">Save Project</button>

                <button type="button" onClick={() => setIsEditing(false)}>
                    Cancel
                </button>
            </form>
        );
    }

    return (
        <div>
            <h4>{title}</h4>
            <p>{description}</p>
            <p>Category: {category}</p>
            <p>Status: {status}</p>

            {dueDate && (
                <p>Due Date: {new Date(dueDate).toLocaleDateString()}</p>
            )}
            {/* <h4>{project.title}</h4>
            <p>{project.description}</p>
            <p>Category: {project.category}</p>
            <p>Status: {project.status}</p>

            {project.dueDate && (
                <p>Due Date: {new Date(project.dueDate).toLocaleDateString()}</p>
            )} */}

            <button onClick={() => setIsEditing(true)}>Edit Project</button>

            <button onClick={handleDeleteProject}>
                Delete Project
            </button>

            <div>
                <p>
                    Progress: {completedTasks} / {totalTasks} tasks completed ({progress}%)
                </p>
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

            <h5>Tasks</h5>

            {tasks.length === 0 ? (
                <p>No tasks yet.</p>
            ) : (
                tasks.map((task) => (
                    <div key={task._id}>
                        <TaskItem
                            task={task}
                            onTaskUpdated={onTaskCreated}
                        />

                        <button onClick={() => handleDeleteTask(task._id)}>
                            Delete Task
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default ProjectCard;