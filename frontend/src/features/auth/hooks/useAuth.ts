import { useContext } from "react";
import type { LoginFormData } from "../types";
import { AuthContext } from "@/providers/AuthProvider";
import * as authService from "@/features/auth/services/auth.services";
import axios from "axios";

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth digunakan harus didalam AuthProvider");

	const handleLogin = async (data: LoginFormData) => {
		try {
			const res = await authService.login(data);
			console.log(res.data);
			context.setToken(res.data?.token || "");
		} catch (error) {
			let message;
			if (axios.isAxiosError(error) && error.response) {
				message = error.response.data.message;
			} else {
				message = String(error);
			}
			throw new Error(message);
		}
	};

	return { ...context, handleLogin };
};
