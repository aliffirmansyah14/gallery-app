import { api } from "@/lib/api/axios";
import type { BaseResponse } from "@/lib/api/types";
import type { Picture } from "../types";

export const getAllFiles = async (
	signal?: AbortSignal,
): Promise<BaseResponse<Picture[]>> => {
	const response = await api.get("/files", {
		signal,
	});
	return response.data;
};

export const uploadFile = async (
	formData: FormData,
	signal?: AbortSignal,
): Promise<BaseResponse<Picture>> => {
	const response = await api.post("/upload", formData, {
		signal,
	});

	return response.data;
};
