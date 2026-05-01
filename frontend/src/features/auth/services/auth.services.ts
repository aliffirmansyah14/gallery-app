import { api } from "@/lib/api/axios";
import type {
	AuthResponse,
	AuthResponseWithToken,
	LoginFormData,
} from "../types";

export const login = async (
	data: LoginFormData,
	controler?: AbortController,
): Promise<AuthResponseWithToken> => {
	const response = await api.post<AuthResponseWithToken>("/login", data, {
		signal: controler?.signal,
	});

	return response.data;
};

export const getMe = async (
	controler?: AbortController,
): Promise<AuthResponse> => {
	const response = await api.get<AuthResponse>("/me", {
		signal: controler?.signal,
	});

	return response.data;
};
