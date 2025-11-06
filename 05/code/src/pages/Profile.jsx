import { useAuth } from "../providers/AuthContex";
import Navbar from "../components/NavBar";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Mi Perfil
          </h1>

          <div className="flex items-center gap-6 mb-8">
            <img
              src={user.picture}
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-blue-500"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-blue-800 mb-2">
                Email
              </h3>
              <p className="text-gray-700">{user.email}</p>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-green-800 mb-2">
                Nombre
              </h3>
              <p className="text-gray-700">{user.name}</p>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-purple-800 mb-2">
                Autenticación
              </h3>
              <p className="text-gray-700">Google OAuth 2.0</p>
            </div>

            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-orange-800 mb-2">
                Sesión activa
              </h3>
              <p className="text-gray-700">
                {new Date().toLocaleDateString("es-MX", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}