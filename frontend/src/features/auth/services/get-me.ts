import { api } from "@/lib/api/axios";
import type { AuthResponse } from "../types";

export const getMe = async (signal?: AbortSignal): Promise<AuthResponse> => {
	const response = await api.get<AuthResponse>("/me", {
		signal,
	});

	return response.data;
};
