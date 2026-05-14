import type { BaseResponse } from "@/lib/api/types";
import type { Picture } from "../types";
import { api } from "@/lib/api/axios";

export const updateFile = async (
	id: string,
	data: Omit<Picture, "id" | "createdAt" | "size">,
	signal?: AbortSignal,
): Promise<BaseResponse<Picture>> => {
	const response = await api.put(`/file/${id}`, data, {
		signal,
	});
	return response.data;
};
