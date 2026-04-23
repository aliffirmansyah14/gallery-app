import { api } from "@/lib/api/axios";
import type {
	AuthResponse,
	AuthResponseWithToken,
	LoginFormData,
} from "../types";

export const login = async (
	data: LoginFormData,
): Promise<AuthResponseWithToken> => {
	const response = await api.post<AuthResponseWithToken>("/login", data);

	return response.data;
};

export const getUser = async (): Promise<AuthResponse> => {
	const response = await api.get<AuthResponse>("/me");

	return response.data;
};
