import AuthLayout from "@/layout/AuthLayout";
import LoginPage from "@/pages/auth/LoginPage";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "@/pages/HomePage";
import AuthProvider from "@/providers/AuthProvider";

const AppRoutes = () => {
	return (
		<AuthProvider>
			<Routes>
				<Route element={<AuthLayout />}>
					<Route path="/login" element={<LoginPage />} />
				</Route>
				<Route element={<ProtectedRoute />}>
					<Route path="/" element={<HomePage />} />
				</Route>
			</Routes>
		</AuthProvider>
	);
};

export default AppRoutes;
