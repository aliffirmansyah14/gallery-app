import Header from "@/features/home/components/Header";
import Siderbar from "@/features/home/components/Siderbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
	return (
		<div className="min-h-dvh">
			<Header />
			<div className="grid grid-cols-[0px_1fr] sm:grid-cols-[var(--sidebar-width)_1fr] min-h-[calc(100dvh-64px)]">
				<Siderbar />
				<Outlet />
			</div>
		</div>
	);
};

export default MainLayout;
