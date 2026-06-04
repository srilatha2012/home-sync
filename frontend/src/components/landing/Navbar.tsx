import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();
    //const token = localStorage.getItem("token");
    //here used useState without useState Navbar is not re-rendering after login
    const [token, setToken] = useState(localStorage.getItem("token"));

    //useLocation() is a React Router hook that tells you which page/URL the user is currently on
    const location = useLocation();


    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        navigate("/login")
    }
    return (
        <nav className="flex items-center justify-between px-8 py-4 border-b bg-white">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
                HomeSync
            </Link>

            <div className="flex gap-4">
                {token ? (
                    <>
                        {location.pathname !== "/dashboard" && (<Link
                            to="/dashboard"
                            className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded hover:bg-indigo-50 transition duration-300"
                        >
                            Dashboard
                        </Link>)}


                        <button
                            onClick={handleLogout}
                            className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-500 hover:text-white transition duration-300"
                        >
                            Logout
                        </button>
                    </>

                ) : (
                    <>

                        {location.pathname !== "/login" && (
                            <Link
                                to="/login"
                                className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded hover:bg-indigo-50"
                            >
                                Login
                            </Link>
                        )}

                        {location.pathname !== "/register" && (<Link
                            to="/register"
                            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                        >
                            Register
                        </Link>)}

                    </>
                )}

            </div>
        </nav>
    );
}

export default Navbar;