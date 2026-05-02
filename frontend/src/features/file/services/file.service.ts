import { api } from "@/lib/api/axios";
import type { FileResponse } from "../types";

export const getAllFiles = async (
	controller?: AbortController,
): Promise<FileResponse> => {
	const response = await api.get("/files", {
		signal: controller?.signal,
	});
	return response.data;
};
