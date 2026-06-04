import { Link } from "react-router-dom";

function CallToAction() {
  return (
    <section className="py-10 px-8 text-center bg-indigo-600 text-white">
      <h2 className="text-3xl font-bold mb-4">
        Ready to Organize Your Family Goals?
      </h2>

      <p className="mb-6">
        Start tracking projects, tasks, and progress with HomeSync.
      </p>

      <Link
        to="/register"
        className="bg-white text-indigo-600 px-6 py-3 rounded font-medium hover:bg-gray-100"
      >
        Create Account
      </Link>
    </section>
  );
}

export default CallToAction;