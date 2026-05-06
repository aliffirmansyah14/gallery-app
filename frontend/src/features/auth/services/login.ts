import { api } from "@/lib/api/axios";
import type { AuthResponseWithToken, LoginFormData } from "../types";

export const login = async (
	data: LoginFormData,
	signal?: AbortSignal,
): Promise<AuthResponseWithToken> => {
	const response = await api.post<AuthResponseWithToken>("/login", data, {
		signal,
	});

	return response.data;
};
