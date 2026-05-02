import AuthLayout from "@/layout/AuthLayout";
import LoginPage from "@/pages/auth/LoginPage";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "@/pages/home/HomePage";
import AuthProvider from "@/providers/AuthProvider";
import MainLayout from "@/layout/MainLayout";

const AppRoutes = () => {
	return (
		<AuthProvider>
			<Routes>
				<Route element={<AuthLayout />}>
					<Route path="/login" element={<LoginPage />} />
				</Route>
				<Route
					element={
						<ProtectedRoute>
							<MainLayout />
						</ProtectedRoute>
					}
				>
					<Route path="/" element={<HomePage />} />
				</Route>
			</Routes>
		</AuthProvider>
	);
};

export default AppRoutes;
