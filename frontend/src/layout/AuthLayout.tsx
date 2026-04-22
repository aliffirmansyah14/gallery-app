import { Outlet } from "react-router-dom";

const AuthLayout = () => {
	return (
		<div className="w-full h-dvh bg-gray-50 dark:bg-background">
			<main className="container mx-auto p-4">
				<Outlet />
			</main>
		</div>
	);
};

export default AuthLayout;
