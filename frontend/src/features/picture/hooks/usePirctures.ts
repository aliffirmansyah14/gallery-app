import { useEffect, useEffectEvent, useRef, useState } from "react";
import { getCleanErrorMessage } from "@/lib/get-clean-error-message";
import type { Picture } from "../types";
import { getAllFiles } from "../services";

export const usePictures = () => {
	const [pictures, setPictures] = useState<Picture[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const abortControllerRef = useRef<AbortController | null>(null);

	const fetchPictures = useEffectEvent(async () => {
		abortControllerRef.current?.abort();

		const controller = new AbortController();
		abortControllerRef.current = controller;

		setLoading(true);
		try {
			const response = await getAllFiles(controller.signal);
			console.log(response.data);
			setPictures(response.data || []);
		} catch (error: any) {
			if (error.name === "CanceledError" || error.name === "AbortError") return;

			const err = getCleanErrorMessage(error);
			console.log("Error saat fetch files : ", err.message);
		} finally {
			if (!controller.signal.aborted) {
				setLoading(false);
			}
		}
	});

	useEffect(() => {
		fetchPictures();

		return () => abortControllerRef.current?.abort();
	}, []);

	return { pictures, loading, setPictures, fetchPictures };
};
