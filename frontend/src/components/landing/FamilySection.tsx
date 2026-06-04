function FamilySection() {
  return (
    <section className="py-8 px-8 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-6">
        Built for the Whole Family
      </h2>

      <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        <div className="border rounded-lg p-6 text-center bg-white shadow-md hover:shadow-lg transition duration-300">
          <h3 className="text-xl font-semibold mb-2">👨 Parent</h3>
          <p className="text-gray-600">Career goals and study plans</p>
        </div>

        <div className="border rounded-lg p-6 text-center bg-white shadow-md hover:shadow-lg transition duration-300">
          <h3 className="text-xl font-semibold mb-2">🧑 Teen</h3>
          <p className="text-gray-600">Homework and sports goals</p>
        </div>

        <div className="border rounded-lg p-6 text-center bg-white shadow-md hover:shadow-lg transition duration-300">
          <h3 className="text-xl font-semibold mb-2">👧 Child</h3>
          <p className="text-gray-600">Reading and activities</p>
        </div>

        <div className="border rounded-lg p-6 text-center bg-white shadow-md hover:shadow-lg transition duration-300">
          <h3 className="text-xl font-semibold mb-2">👩 Spouse</h3>
          <p className="text-gray-600">Home and personal tasks</p>
        </div>
      </div>
    </section>
  );
}

export default FamilySection;