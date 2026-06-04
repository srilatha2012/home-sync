import { Link } from "react-router-dom";

function HeroSection() {
  const token = localStorage.getItem("token");

  return (
    <section className="text-center py-16 px-6 bg-gradient-to-b from-indigo-50 to-white">
      <h1 className="text-5xl font-bold text-gray-900 mb-4">
        Stay Organized. Track Progress. Achieve Goals Together.
      </h1>

      <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
        HomeSync helps families manage projects, tasks, and progress in one simple dashboard.
      </p>

      <div className="flex justify-center gap-4">
        {token ? (
          <Link
            to="/dashboard"
            className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition duration-300"
          >
            Go to Dashboard
          </Link>
        ) : (
          <>
            <Link
              to="/register"
              className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition duration-300"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded hover:bg-indigo-50 transition duration-300"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </section>
  );
}

export default HeroSection;