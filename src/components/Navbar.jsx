export default function Navbar() {
  return (
    <div className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold text-blue-600">
        TaskFlow 🚀
      </h1>

      <div className="flex gap-6 items-center text-lg">
        <a href="/admin" className="hover:text-blue-500">Dashboard</a>
        <a href="/activity" className="hover:text-blue-500">Activity</a>
        <a href="/notifications" className="hover:text-blue-500">Notifications</a>

        <button
          onClick={()=>{
            localStorage.clear();
            window.location.href="/";
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

    </div>
  );
}