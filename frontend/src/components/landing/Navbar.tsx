import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="flex items-center justify-between px-8 py-4 border-b bg-white">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
                HomeSync
            </Link>

            <div className="flex gap-4">
                <Link
                    to="/login"
                    className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded hover:bg-indigo-50"
                >
                    Login
                </Link>

                <Link
                    to="/register"
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    Register
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;