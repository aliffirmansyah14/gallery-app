import { api } from "@/lib/api/axios";
import type { AuthResponse, LoginFormData } from "../types";

export const login = async (data: LoginFormData): Promise<AuthResponse> => {
	const response = await api.post<AuthResponse>("/login", data);

	return response.data;
};

export const getUser = async () => {
	const response = await api.get<AuthResponse>("/me");

	return response.data;
};
