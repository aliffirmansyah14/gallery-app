import { useAuth } from "@/features/auth/hooks/useAuth";
// import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
	// const { user, loading } = useAuth();

	// console.log("Auth State:", { user, loading });
	// if (loading) return <></>;

	// if (!user) return <Navigate to={"/login"} replace />;

	return children;
};

export default ProtectedRoute;
