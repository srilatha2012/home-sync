import { useEffect, useState } from "react";
import { API_URL } from "../../config";
import axios from "axios";

type Stats = {
  totalFamilies: number;
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
};

function StatsSection() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await axios.get(`${API_URL}/api/public/stats`);
        setStats(response.data);
      } catch (error) {
        console.log("Failed to fetch stats", error);
      }
    }

    fetchStats();
  }, []);

  if (!stats) return null;

  return (
    <section className="py-12 px-8 bg-indigo-50">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
        HomeSync in Numbers
      </h2>

      <p className="text-gray-600 text-center mb-8">
        Real-time statistics from families using HomeSync.
      </p>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition duration-300">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-gray-200">
          <div>
            <p className="text-6xl font-bold text-indigo-600">
              {stats.totalFamilies}
            </p>
            <p className="text-gray-600 mt-2">👨‍👩‍👧‍👦 Active Families</p>
          </div>

          <div>
            <p className="text-6xl font-bold text-indigo-600">
              {stats.totalProjects}
            </p>
            <p className="text-gray-600 mt-2">📁 Projects Created</p>
          </div>

          <div>
            <p className="text-6xl font-bold text-indigo-600">
              {stats.totalTasks}
            </p>
            <p className="text-gray-600 mt-2">✅ Tasks Tracked</p>
          </div>

          <div>
            <p className="text-6xl font-bold text-indigo-600">
              {stats.completedTasks}
            </p>
            <p className="text-gray-600 mt-2">🎯 Tasks Completed</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatsSection;