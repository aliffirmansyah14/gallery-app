import { api } from "@/lib/api/axios";
import type {
	AuthResponse,
	AuthResponseWithToken,
	LoginFormData,
} from "../types";

export const login = async (
	data: LoginFormData,
	signal?: AbortSignal,
): Promise<AuthResponseWithToken> => {
	const response = await api.post<AuthResponseWithToken>("/login", data, {
		signal,
	});

	return response.data;
};

export const getMe = async (signal?: AbortSignal): Promise<AuthResponse> => {
	const response = await api.get<AuthResponse>("/me", {
		signal,
	});

	return response.data;
};
