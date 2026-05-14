import {
	useCallback,
	useEffect,
	useEffectEvent,
	useRef,
	useState,
} from "react";
import { getCleanErrorMessage } from "@/lib/get-clean-error-message";
import type { Picture } from "../types";
import { deleteFile, getFileById, updateFile } from "../services";

export const usePictureDetail = (id: string) => {
	const [picture, setPicture] = useState<Picture | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [isPending, setIsPending] = useState<boolean>(false);

	const abortControllerRef = useRef<AbortController | null>(null);

	// Helper untuk abort (Compiler akan mengoptimasi ini)
	const createSignal = () => {
		abortControllerRef.current?.abort();
		abortControllerRef.current = new AbortController();
		return abortControllerRef.current.signal;
	};

	const fetchPicture = useEffectEvent(async () => {
		if (!id) {
			setLoading(false);
			return;
		}

		const signal = createSignal();

		setLoading(true);
		setError(null);

		try {
			const response = await getFileById(id, signal);

			setPicture(response.data ?? null);
		} catch (err: unknown) {
			if (
				err instanceof Error &&
				(err.name === "CanceledError" || err.name === "AbortError")
			)
				return;

			const cleanError = getCleanErrorMessage(err);
			console.log(cleanError);

			setError(cleanError.message);
		} finally {
			if (!signal.aborted) {
				setLoading(false);
			}
		}
	});

	const handleUpdate = useCallback(
		async (data: Omit<Picture, "id" | "createdAt" | "size">): Promise<void> => {
			const signal = createSignal();
			setIsPending(true);
			setError(null);

			try {
				const response = await updateFile(id, data, signal);
				setPicture(response.data ?? null);
			} catch (err: unknown) {
				if (
					err instanceof Error &&
					(err.name === "CanceledError" || err.name === "AbortError")
				)
					return;

				const cleanError = getCleanErrorMessage(err);
				setError(cleanError.message);
			} finally {
				if (!signal.aborted) {
					setIsPending(false);
				}
			}
		},
		[id],
	);

	const handleDelete = useCallback(async (): Promise<void> => {
		const signal = createSignal();
		setIsPending(true);
		setError(null);

		try {
			await deleteFile(id, signal);

			setPicture(null);
		} catch (err: unknown) {
			if (
				err instanceof Error &&
				(err.name === "CanceledError" || err.name === "AbortError")
			)
				return;

			const cleanError = getCleanErrorMessage(err);
			setError(cleanError.message);
		} finally {
			if (!signal.aborted) {
				setIsPending(false);
			}
		}
	}, [id]);

	useEffect(() => {
		fetchPicture();
		return () => abortControllerRef.current?.abort();
	}, [id]);

	return {
		picture,
		loading,
		error,
		isPending,
		fetchPicture,
		handleUpdate,
		handleDelete,
	};
};
