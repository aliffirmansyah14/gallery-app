import type { BaseResponse } from "@/lib/api/types";
import type { Picture } from "../types";
import { api } from "@/lib/api/axios";

export const uploadFile = async (
	formData: FormData,
	signal?: AbortSignal,
): Promise<BaseResponse<Picture>> => {
	const response = await api.post("/upload", formData, {
		signal,
	});

	return response.data;
};
