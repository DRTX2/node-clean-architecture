import { useEffect, useState } from "react";
import { getUsers } from "../api/user";
import { User } from "../types/user";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRequest = async () => {
    try {
      const { users } = await getUsers();
      setUsers(users);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    handleRequest();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-200">Usuarios</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Salir
        </button>
      </div>

      {error && (
        <p className="bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded mb-4">
          {error}. <a className="cursor-pointer" onClick={()=>navigate("/login")}> Necesitas iniciar sesion</a>
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map((u) => (
          <div
            key={u.id}
            className="bg-gray-800 shadow-sm border border-gray-700 rounded-md p-4"
          >
            <h3 className="text-lg font-semibold text-gray-100">{u.name}</h3>
            <p className="text-gray-300">{u.email}</p>
            <div className="mt-2">
              <span className="text-sm text-gray-300 font-medium">Roles:</span>
              <ul className="list-disc list-inside ml-2 text-sm text-gray-200">
                {u.role.map((r) => (
                  <li key={r.id}>{r.role}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
