import { useAuth } from "@/features/auth/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
	const { user, loading } = useAuth();

	if (!user && !loading) return <Navigate to={"/login"} replace />;

	return <Outlet />;
};

export default ProtectedRoute;
