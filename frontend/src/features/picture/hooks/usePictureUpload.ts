import { useCallback, useEffect, useRef, useState } from "react";
import { uploadFile } from "../services";
import { getCleanErrorMessage } from "@/lib/get-clean-error-message";
import type { Picture } from "../types";

export default function usePictureUpload() {
	const [isUploading, setIsUploading] = useState(false);
	const abortControllerRef = useRef<AbortController | null>(null);

	useEffect(() => {
		return () => abortControllerRef.current?.abort();
	}, []);

	const handleUpload = useCallback(
		async (
			file: File,
			callback?: (newPicture: Picture) => Promise<void> | void,
		): Promise<void> => {
			abortControllerRef.current?.abort();
			const controller = new AbortController();
			abortControllerRef.current = controller;

			const formData = new FormData();
			formData.set("file", file);

			setIsUploading(true);

			try {
				const response = await uploadFile(formData, controller.signal);

				if (response.success && response.data) {
					await callback?.(response.data as Picture);
				}
			} catch (error: unknown) {
				if (
					error instanceof Error &&
					(error.name === "CanceledError" || error.name === "AbortError")
				) {
					return;
				}

				const err = getCleanErrorMessage(error);
				console.log("Error saat upload file : ", err);
			} finally {
				// kalo abort tetap diulang uploadnya jadi loading tetap false
				if (!controller.signal.aborted) {
					setIsUploading(false);
				}
			}
		},
		[],
	);

	return { handleUpload, isUploading } as const;
}
