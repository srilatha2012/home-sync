import { useNavigate } from "react-router-dom";
import CreateFamilyForm from "../components/family/CreateFamilyForm";
import type { User } from "../types";
import { useEffect, useState } from "react";
import CreateProjectForm from "../components/projects/CreateProjectForm";
import ProjectList from "../components/projects/ProjectList";


type Family = {
    _id: string;
    name: string;
    members: unknown[];
}

type Task = {
    _id: string;
    title: string;
    description?: string;
    priority: string;
    status: string;
    dueDate?: string;
    project: {
        _id: string;
        title: string;
    };
};
function DashboardPage() {

    const navigate = useNavigate();
    const user: User = JSON.parse(localStorage.getItem("user") || "{}");
    const [family, setFamily] = useState<Family | null>(null);
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState<Task[]>([]);

    async function getFamily() {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:3000/api/families/my-family", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        const data = await response.json();
        if (response.ok) {
            setFamily(data.family)
        }
    }

    useEffect(() => {

        getFamily();
    }, []);

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }
    //fetch projects
    async function fetchProjects() {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:3000/api/projects", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    //fetch tasks
    async function fetchTasks() {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:3000/api/tasks", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();
        setTasks(data);
    }
    //useEffect
    useEffect(() => {
        fetchProjects();
        fetchTasks();
    }, []);
    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-4xl font-bold text-blue-600">
                        HomeSync
                    </h1>

                    <p className="text-gray-600">
                        Welcome, {user.username}
                    </p>
                </div>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>

            {family ? (
                <div className="bg-blue-50 border border-blue-100 shadow rounded-lg p-4 mb-6">
                    <h2 className="text-xl font-semibold text-blue-700">
                        Family: {family.name}
                    </h2>

                    <p className="text-gray-600">
                        Members: {family.members.length}
                    </p>
                </div>
            ) : (
                <div className="bg-white shadow rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4">
                        Create Family
                    </h2>

                    <CreateFamilyForm onFamilyCreated={getFamily} />
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                    <h3 className="text-gray-600">Total Projects</h3>
                    <p className="text-2xl font-bold text-blue-600">{projects.length}</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                    <h3 className="text-gray-600">Total Tasks</h3>
                    <p className="text-2xl font-bold text-blue-600">{tasks.length}</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                    <h3 className="text-gray-600">Completed Tasks</h3>
                    <p className="text-2xl font-bold text-blue-600">
                        {tasks.filter((task) => task.status === "done").length}
                    </p>
                </div>
            </div>
            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">
                    Create Project
                </h2>

                <CreateProjectForm
                    onProjectCreated={fetchProjects}
                />
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">
                    My Projects
                </h2>

                <ProjectList
                    projects={projects}
                    tasks={tasks}
                    onTaskCreated={fetchTasks}
                    onProjectChanged={fetchProjects}
                />
            </div>

        </div>
    )
}

export default DashboardPage;