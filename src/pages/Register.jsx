import { useState } from "react";
import API from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "member"
  });

  const handleSignup = async () => {
    try {
      await API.post("/auth/signup", form);
      alert("Signup success");
      window.location.href = "/";
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Signup</h2>

        <input className="border p-2 w-full mb-3 rounded"
          placeholder="Name"
          onChange={(e)=>setForm({...form,name:e.target.value})}
        />

        <input className="border p-2 w-full mb-3 rounded"
          placeholder="Email"
          onChange={(e)=>setForm({...form,email:e.target.value})}
        />

        <input type="password" className="border p-2 w-full mb-3 rounded"
          placeholder="Password"
          onChange={(e)=>setForm({...form,password:e.target.value})}
        />

        <select className="border p-2 w-full mb-3 rounded"
          onChange={(e)=>setForm({...form,role:e.target.value})}
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={handleSignup}
          className="bg-green-500 text-white w-full p-2 rounded hover:bg-green-600"
        >
          Signup
        </button>
      </div>

    </div>
  );
}