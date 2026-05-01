import type { AuthContextTypes } from "@/providers/AuthProvider";
import { createContext, use } from "react";

export const AuthContext = createContext<AuthContextTypes | undefined>(
	undefined,
);

export const useAuth = () => {
	const context = use(AuthContext);
	if (!context) throw new Error("useAuth digunakan harus didalam AuthProvider");

	return context;
};
