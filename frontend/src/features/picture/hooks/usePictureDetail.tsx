import { useEffect, useRef, useState } from "react";
import { getCleanErrorMessage } from "@/lib/get-clean-error-message";
import type { Picture } from "../types";
import { getFileById } from "../services";

export const usePictureDetail = (id: string) => {
	const [picture, setPicture] = useState<Picture | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const abortControllerRef = useRef<AbortController | null>(null);

	const fetchPicture = async () => {
		abortControllerRef.current?.abort();
		abortControllerRef.current = new AbortController();

		setLoading(true);
		try {
			await new Promise(resolve => setTimeout(resolve, 1500));
			const response = await getFileById(id, abortControllerRef.current.signal);

			setPicture(response.data || null);
		} catch (error: any) {
			if (error.name === "CanceledError" || error.name === "AbortError") return;

			const err = getCleanErrorMessage(error);
			console.log("Error saat fetch file: ", err.message);

			setPicture(null);
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
