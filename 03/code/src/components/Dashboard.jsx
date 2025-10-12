import { useAuth } from "../contex/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">Bienvenido, {user?.name}</h2>
      <button
        onClick={logout}
        className="mt-3 bg-red-600 text-white rounded-lg px-4 py-2"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
