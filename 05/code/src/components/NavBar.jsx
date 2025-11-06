import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthContex";
import { toast } from "react-hot-toast";

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Sesión cerrada correctamente");
    navigate("/login");
  };
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-2xl font-bold text-blue-600">
              TaskApp
            </Link>
          </div>
          <div className="hidden md:flex gap-4">
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Perfil
            </Link>
          </div>
          {user && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-8 h-8 rounded-full border-2 border-blue-500"
                />
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  {user.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm font-medium"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
