import type { BaseResponse } from "@/lib/api/types";
import type { Picture } from "../types";
import { api } from "@/lib/api/axios";

export const getFileById = async (
	id: string,
	signal?: AbortSignal,
): Promise<BaseResponse<Picture>> => {
	const response = await api.get(`/file/${id}`, {
		signal,
	});
	return response.data;
};
