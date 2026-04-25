import { useAuth } from "@/features/auth/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
	// const { user, loading } = useAuth();

	// if (!user && !loading) return <Navigate to={"/login"} replace />;

	return children;
};

export default ProtectedRoute;
