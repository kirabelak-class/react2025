import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../providers/AuthContex";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const userData = {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    };
    login(userData);
    toast.success(`¡Bienvenido ${decoded.name}!`);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full space-y-6 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">TaskApp</h1>
          <p className="text-gray-600">
            Gestiona tus tareas de forma simple y efectiva
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-6 space-y-3">
          <h2 className="text-xl font-semibold text-center text-gray-700">
            Iniciar sesión
          </h2>
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => {
                toast.error("Error al iniciar sesión con Google");
              }}
              useOneTap
            />
          </div>
        </div>
      </div>
    </div>
  );
}
