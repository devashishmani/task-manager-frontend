import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [projectName, setProjectName] = useState("");
  const [editProjectId, setEditProjectId] = useState("");

  const [selectedProject, setSelectedProject] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskUser, setTaskUser] = useState("");

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setUsers((await API.get("/users")).data);
    setProjects((await API.get("/projects")).data);
    setTasks((await API.get("/tasks")).data);
  };

  // 🔥 PROJECT CRUD
  const createProject = async () => {
    if (!projectName) return;
    await API.post("/projects", { name: projectName });
    setProjectName("");
    loadAll();
  };

  const updateProject = async () => {
    await API.put(`/projects/${editProjectId}`, { name: projectName });
    setEditProjectId("");
    setProjectName("");
    loadAll();
  };

  const deleteProject = async (id) => {
    await API.delete(`/projects/${id}`);
    loadAll();
  };

  // 🔥 MEMBERS
  const addMembers = async () => {
    await API.put(`/projects/add-members/${selectedProject}`, {
      userIds: selectedUsers
    });
    setSelectedUsers([]);
    loadAll();
  };

  const removeMember = async (projectId, userId) => {
    await API.put(`/projects/remove-member/${projectId}`, {
      userId
    });
    loadAll();
  };

  // 🔥 TASK
  const createTask = async () => {
    await API.post("/tasks", {
      title: taskTitle,
      assignedTo: taskUser,
      project: selectedProject
    });
    setTaskTitle("");
    loadAll();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    loadAll();
  };

  // 🔥 STATS
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "completed").length;
  const pending = total - completed;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="p-8 max-w-7xl mx-auto">

        {/* HEADER */}
        <h2 className="text-4xl font-bold mb-6">Admin Dashboard</h2>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <p>Total Tasks</p>
            <h3 className="text-3xl font-bold">{total}</h3>
          </div>

          <div className="bg-green-100 p-6 rounded-xl shadow">
            <p>Completed</p>
            <h3 className="text-3xl font-bold">{completed}</h3>
          </div>

          <div className="bg-yellow-100 p-6 rounded-xl shadow">
            <p>Pending</p>
            <h3 className="text-3xl font-bold">{pending}</h3>
          </div>

          <div className="bg-blue-100 p-6 rounded-xl shadow">
            <p>Projects</p>
            <h3 className="text-3xl font-bold">{projects.length}</h3>
          </div>
        </div>

        {/* CREATE / UPDATE PROJECT */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h3 className="text-xl font-semibold mb-3">Project</h3>

          <div className="flex gap-3">
            <input
              className="border p-2 w-full rounded"
              placeholder="Project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />

            {editProjectId ? (
              <button onClick={updateProject} className="bg-yellow-500 text-white px-4 rounded">
                Update
              </button>
            ) : (
              <button onClick={createProject} className="bg-blue-500 text-white px-4 rounded">
                Create
              </button>
            )}
          </div>
        </div>

        {/* PROJECT LIST */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h3 className="text-xl font-semibold mb-3">Projects</h3>

          {projects.map(p => (
            <div key={p._id} className="border-b py-3">

              <div className="flex justify-between items-center">
                <span className="text-lg">{p.name}</span>

                <div className="flex gap-2">
                  <button
                    onClick={()=>{
                      setEditProjectId(p._id);
                      setProjectName(p.name);
                    }}
                    className="text-blue-500"
                  >
                    Edit
                  </button>

                  <button
                    onClick={()=>deleteProject(p._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="text-sm text-gray-500 mt-1">
                Members:
                {p.members.map(m=>(
                  <span key={m._id} className="ml-2">
                    {m.name}
                    <button
                      onClick={()=>removeMember(p._id, m._id)}
                      className="text-red-400 ml-1"
                    >
                      x
                    </button>
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* ADD MEMBERS */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h3 className="text-xl font-semibold mb-3">Add Members</h3>

          <select
            onChange={(e)=>setSelectedProject(e.target.value)}
            className="border p-2 rounded mb-3"
          >
            <option>Select Project</option>
            {projects.map(p=>(
              <option key={p._id} value={p._id}>{p.name}</option>
            ))}
          </select>

          <div className="grid grid-cols-3 gap-2">
            {users.map(u=>(
              <label key={u._id} className="bg-gray-50 p-2 rounded">
                <input
                  type="checkbox"
                  onChange={(e)=>{
                    if(e.target.checked){
                      setSelectedUsers(prev=>[...prev,u._id])
                    }
                  }}
                />
                {u.name}
              </label>
            ))}
          </div>

          <button onClick={addMembers} className="bg-green-500 text-white px-4 mt-3 rounded">
            Add Members
          </button>
        </div>

        {/* TASKS */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-3">Tasks</h3>

          <input
            className="border p-2 w-full mb-3"
            placeholder="Task title"
            value={taskTitle}
            onChange={(e)=>setTaskTitle(e.target.value)}
          />

          <button onClick={createTask} className="bg-purple-500 text-white px-4 mb-4 rounded">
            Add Task
          </button>

          {tasks.map(t=>(
            <div key={t._id} className="flex justify-between border-b py-2">
              {t.title}
              <button
                onClick={()=>deleteTask(t._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}