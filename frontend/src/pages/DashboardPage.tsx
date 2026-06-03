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

function DashboardPage() {

    const navigate = useNavigate();
    const user: User = JSON.parse(localStorage.getItem("user") || "{}");
    const [family, setFamily] = useState<Family | null>(null);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
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
        getFamily();
    }, []);

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }
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
    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Welcom, {user.username}</h2>
            <button onClick={handleLogout}>Logout</button>
            <hr />
            {family ? (
                <div>
                    <h2>Family: {family.name}</h2>
                    <p>Members: {family.members.length}</p>
                </div>
            ) : (
                <>
                    {/* Passing user data from parent component to child component using props */}
                    <CreateFamilyForm />
                </>
            )}
            <CreateProjectForm
                onProjectCreated={fetchProjects}
            />

            <ProjectList
                projects={projects}
            />

        </div>
    )
}

export default DashboardPage;