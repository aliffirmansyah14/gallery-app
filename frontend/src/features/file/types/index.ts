import type { BaseResponse } from "@/lib/api/types";

export type File = {
	id: string;
	name: string;
	mimeType: string;
	url: string;
	blurDataUrl: string | null;
	createdAt: Date;
};

export type FileResponse = BaseResponse<File[]>;
