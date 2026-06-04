function FeatureSection() {
  return (
    <section className="py-12 px-8 bg-white">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
        Why Choose HomeSync?
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="border border-gray-200 rounded-lg p-6 text-center bg-white shadow-md hover:shadow-lg transition duration-300">
          <div className="text-4xl mb-4">📁</div>
          <h3 className="text-xl font-semibold text-indigo-600 mb-3">
            Family Projects
          </h3>
          <p className="text-gray-600">
            Create projects for study, school, career, home, and personal goals.
          </p>
        </div>

        <div className="border border-gray-200 rounded-lg p-6 text-center bg-white shadow-md hover:shadow-lg transition duration-300">
          <div className="text-4xl mb-4">✅</div>
          <h3 className="text-xl font-semibold text-indigo-600 mb-3">
            Task Management
          </h3>
          <p className="text-gray-600">
            Add tasks, set priorities, update status, and stay organized.
          </p>
        </div>

        <div className="border border-gray-200 rounded-lg p-6 text-center bg-white shadow-md hover:shadow-lg transition duration-300">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-indigo-600 mb-3">
            Progress Tracking
          </h3>
          <p className="text-gray-600">
            Track completed tasks and monitor progress for each project.
          </p>
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;