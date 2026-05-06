import type { BaseResponse } from "@/lib/api/types";
import type { Picture } from "../types";
import { api } from "@/lib/api/axios";

export const getAllFiles = async (
	signal?: AbortSignal,
): Promise<BaseResponse<Picture[]>> => {
	const response = await api.get("/files", {
		signal,
	});
	return response.data;
};
