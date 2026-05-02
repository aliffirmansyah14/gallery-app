import { api } from "@/lib/api/axios";
import type { FileResponse } from "../types";

export const getAllFiles = async (
	signal?: AbortSignal,
): Promise<FileResponse> => {
	const response = await api.get("/files", {
		signal,
	});
	return response.data;
};
