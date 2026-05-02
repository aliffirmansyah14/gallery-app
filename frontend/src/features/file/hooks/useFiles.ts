import { useEffect, useRef, useState } from "react";
import type { File } from "../types";
import * as fileService from "@/features/file/services/file.service";
import { getCleanErrorMessage } from "@/lib/get-clean-error-message";

export const useFiles = () => {
	const [files, setFiles] = useState<File[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const abortControllerRef = useRef<AbortController | null>(null);

	useEffect(() => {
		const fetchFiles = async () => {
			abortControllerRef.current?.abort();
			abortControllerRef.current = new AbortController();

			setLoading(true);
			try {
				const response = await fileService.getAllFiles(
					abortControllerRef.current.signal,
				);
				console.log(response.data);
				setFiles(response.data || []);
			} catch (error: any) {
				if (error.name === "CanceledError" || error.name === "AbortError")
					return;

				const err = getCleanErrorMessage(error);
				console.log("Error saat fetch files : ", err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchFiles();

		return () => abortControllerRef.current?.abort();
	}, []);

	return { files, loading };
};
