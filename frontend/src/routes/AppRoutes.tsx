import AuthLayout from "@/layout/AuthLayout";
import LoginPage from "@/pages/auth/LoginPage";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "@/pages/home/HomePage";
import AuthProvider from "@/providers/AuthProvider";
import MainLayout from "@/layout/MainLayout";
import { PictureProvider } from "@/providers/PictureProvider";
import DetailPage from "@/pages/detail/DetailPage";

const AppRoutes = () => {
	return (
		<AuthProvider>
			<Routes>
				<Route element={<AuthLayout />}>
					<Route path="/login" element={<LoginPage />} />
				</Route>
				<Route
					element={
						<AuthProvider>
							<ProtectedRoute>
								<PictureProvider>
									<MainLayout />
								</PictureProvider>
							</ProtectedRoute>
						</AuthProvider>
					}
				>
					<Route path="/" element={<HomePage />}>
						<Route path="/detail/:id" element={<DetailPage />} />
					</Route>
				</Route>
			</Routes>
		</AuthProvider>
	);
};

export default AppRoutes;
