import { useEffect, useRef, useState } from "react";
import { getFileById } from "@/features/picture/services/file.service";
import { getCleanErrorMessage } from "@/lib/get-clean-error-message";
import type { Picture } from "../types";

export const usePictureDetail = (id: string) => {
	const [picture, setPicture] = useState<Picture | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const abortControllerRef = useRef<AbortController | null>(null);

	const fetchPicture = async () => {
		abortControllerRef.current?.abort();
		abortControllerRef.current = new AbortController();

		setLoading(true);
		try {
			await new Promise(resolve => setTimeout(resolve, 300));
			const response = await getFileById(id, abortControllerRef.current.signal);
			console.log(response.data);
			setPicture(response.data || null);
		} catch (error: any) {
			if (error.name === "CanceledError" || error.name === "AbortError") return;

			const err = getCleanErrorMessage(error);
			console.log("Error saat fetch file: ", err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (id) {
			fetchPicture();
		}

		return () => abortControllerRef.current?.abort();
	}, []);

	return { picture, setPicture, loading, fetchPicture };
};
