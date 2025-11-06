import { Navigate } from "react-router-dom";
import { useAuth } from "./../providers/AuthContex";
import Skeleton from "./Skeltons";

export default function ProtectedRoute({ children }) {
	const { user, loading } = useAuth();
	if (loading) return <Skeleton />;
	if (!user) return <Navigate to="/login" replace />;
	return children;
}
