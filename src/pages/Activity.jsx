import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

export default function Activity() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    API.get("/activity").then(res => setLogs(res.data));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Activity Logs</h2>

        {logs.map(l => (
          <div key={l._id} className="border-b py-2">
            {l.user?.name} → {l.action}
          </div>
        ))}
      </div>
    </div>
  );
}