import MainLayout from "@/layout/MainLayout";
import LoginPage from "@/pages/auth/LoginPage";
import { Routes, Route } from "react-router-dom";

const AppRoutes = () => {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path="/login" element={<LoginPage />} />
			</Route>
		</Routes>
	);
};

export default AppRoutes;
