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
    project: {
        _id: string;
        title: string;
    };
};
function DashboardPage() {

    const user: User = JSON.parse(localStorage.getItem("user") || "{}");
    const [family, setFamily] = useState<Family | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

   const filteredProjects = projects.filter((project) =>
  project.title.toLowerCase().includes(searchTerm.toLowerCase())
);

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

    // function handleLogout() {
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("user");
    //     navigate("/login");
    // }
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

            if (response.ok) {
                setProjects(data);
            } else {
                console.log("Failed to fetch projects:", data.message);
                setProjects([]);
            }
        } catch (error) {
            console.log("Error fetching projects:", error);
            setProjects([]);
        }
    }

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
        <div className="max-w-6xl mx-auto p-6 mt-4">
            <div className="mb-6">

                <h2 className="text-2xl font-semibold text-gray-800">
                    Welcome,{" "}
                    <span className="text-indigo-600">
                        {user.username}
                    </span>
                </h2>
                <p className="text-gray-500">
                    Manage your family projects and tasks here.
                </p>
            </div>

            {family ? (
                <div className="bg-indigo-50 border border-indigo-100 rounded-lg shadow-sm p-4 mb-6">
                    <h3 className="text-lg font-semibold text-indigo-700">
                        👨‍👩‍👧‍👦 {family.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                        {family.members.length} member{family.members.length !== 1 ? "s" : ""}
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
                    <p className="text-3xl font-bold text-indigo-600">{projects.length}</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                    <h3 className="text-gray-600">Total Tasks</h3>
                    <p className="text-3xl font-bold text-indigo-600">{tasks.length}</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                    <h3 className="text-gray-600">Completed Tasks</h3>
                    <p className="text-3xl font-bold text-indigo-600">
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
                <input
                    type="text"
                    placeholder="🔍 Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border rounded px-3 py-2 mb-4"
                />
                {filteredProjects.length === 0 && searchTerm.trim() ? (
                    <p className="text-gray-500">No matching projects found.</p>
                ) : (
                    <ProjectList
                        projects={filteredProjects}
                        tasks={tasks}
                        onTaskCreated={fetchTasks}
                        onProjectChanged={fetchProjects}
                    />
                )}
            </div>

        </div>
        
    )
}

export default DashboardPage;