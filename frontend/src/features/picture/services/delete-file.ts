import { api } from "@/lib/api/axios";
import type { BaseResponse } from "@/lib/api/types";

export const deleteFile = async (id: string, signal?: AbortSignal) => {
	return await api.delete<BaseResponse<any>>(`/file/${id}`, {
		signal,
	});
};
