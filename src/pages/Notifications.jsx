import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

export default function Notifications() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/notifications").then(res => setData(res.data));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Notifications</h2>

        {data.map(n => (
          <div key={n._id} className="border-b py-2">
            {n.message}
          </div>
        ))}
      </div>
    </div>
  );
}