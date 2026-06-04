import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="text-center py-10 px-6 bg-gradient-to-b from-indigo-50 to-white">
      <h1 className="text-5xl font-bold text-gray-900 mb-4">
        Organize Your Family Goals in One Place
      </h1>

      <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
        Create projects, manage tasks, and track progress for study, school,
        career, home, and family goals.
      </p>

      <div className="flex justify-center gap-4">
        <Link
          to="/register"
          className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700"
        >
          Get Started
        </Link>

        <Link
          to="/login"
          className="border px-6 py-3 rounded hover:bg-gray-100"
        >
          Login
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;