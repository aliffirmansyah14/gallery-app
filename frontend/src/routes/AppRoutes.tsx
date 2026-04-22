import AuthLayout from "@/layout/AuthLayout";
import LoginPage from "@/pages/auth/LoginPage";
import { Routes, Route } from "react-router-dom";

const AppRoutes = () => {
	return (
		<Routes>
			<Route element={<AuthLayout />}>
				<Route path="/login" element={<LoginPage />} />
			</Route>
		</Routes>
	);
};

export default AppRoutes;
