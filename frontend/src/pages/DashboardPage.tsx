import { useNavigate } from "react-router-dom";

function DashboardPage() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }
    return(
        <div>
            <h1>Dashboard</h1>
            <h2>Welcom, {user.username}</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default DashboardPage;