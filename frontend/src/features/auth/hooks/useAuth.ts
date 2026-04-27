import { use } from "react";
import type { LoginFormData } from "../types";
import { AuthContext } from "@/providers/AuthProvider";
import * as authService from "@/features/auth/services/auth.services";
import { getCleanErrorMessage } from "@/lib/get-clean-error-message";

export const useAuth = () => {
	const context = use(AuthContext);
	if (!context) throw new Error("useAuth digunakan harus didalam AuthProvider");

	const handleLogin = async (data: LoginFormData) => {
		try {
			context.abortControllerRef.current?.abort();
			const res = await authService.login(
				data,
				context.abortControllerRef.current,
			);
			console.log(res.data);
			context.setToken(res.data?.token || "");
			context.setUser(res.data?.user);
		} catch (error) {
			const err = getCleanErrorMessage(error);
			console.log(err);
		}
	};

	return { ...context, handleLogin };
};
