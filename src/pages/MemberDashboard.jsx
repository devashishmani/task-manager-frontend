import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

export default function MemberDashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API.get("/tasks").then(res=>setTasks(res.data));
  }, []);

  const total = tasks.length;
  const completed = tasks.filter(t=>t.status==="completed").length;

  return (
    <div>
      <Navbar />

      <div className="p-8 max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold mb-6">My Dashboard</h2>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow">
            <p>Total</p>
            <h3 className="text-3xl font-bold">{total}</h3>
          </div>

          <div className="bg-green-100 p-6 rounded-2xl shadow">
            <p>Completed</p>
            <h3 className="text-3xl font-bold">{completed}</h3>
          </div>

          <div className="bg-yellow-100 p-6 rounded-2xl shadow">
            <p>Pending</p>
            <h3 className="text-3xl font-bold">{total - completed}</h3>
          </div>
        </div>

        {/* TASK LIST */}
        <div className="bg-white p-6 rounded-2xl shadow">
          {tasks.map(t=>(
            <div key={t._id} className="flex justify-between py-3 border-b">
              <div>
                <p className="text-lg">{t.title}</p>
                <p className="text-sm text-gray-500">
                  {t.project?.name}
                </p>
              </div>

              <span className={`px-3 py-1 rounded ${
                t.status==="completed"
                ? "bg-green-200"
                : "bg-yellow-200"
              }`}>
                {t.status}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}