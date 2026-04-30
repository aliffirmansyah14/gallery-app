import { use } from "react";
import { AuthContext } from "@/providers/AuthProvider";

export const useAuth = () => {
	const context = use(AuthContext);
	if (!context) throw new Error("useAuth digunakan harus didalam AuthProvider");

	return context;
};
