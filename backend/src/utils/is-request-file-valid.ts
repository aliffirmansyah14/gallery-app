import type { FileRequest } from "../services/file.service";

const validFileRequestKeys: (keyof FileRequest)[] = [
	"name",
	"blurDataUrl",
	"mimeType",
	"size",
	"url",
];

const isRequestFileValid = (keys: string[]): boolean => {
	return (
		keys.length === validFileRequestKeys.length &&
		keys.every(k => validFileRequestKeys.includes(k as keyof FileRequest))
	);
};

export { isRequestFileValid };
