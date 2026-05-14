import {
	useEffect,
	useEffectEvent,
	useRef,
	useState,
	useTransition,
} from "react";
import { getCleanErrorMessage } from "@/lib/get-clean-error-message";
import type { Picture } from "../types";
import { deleteFile, getFileById, updateFile } from "../services";

export const usePictureDetail = (id: string) => {
	const [picture, setPicture] = useState<Picture | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const [isPending, startTransition] = useTransition();
	const abortControllerRef = useRef<AbortController | null>(null);

	// Helper untuk abort (Compiler akan mengoptimasi ini)
	const createSignal = () => {
		abortControllerRef.current?.abort();
		const controller = new AbortController();
		abortControllerRef.current = controller;
		return controller.signal;
	};

	const fetchPicture = useEffectEvent(async () => {
		if (!id) return;

		const signal = createSignal();

		setLoading(true);
		setError(null);

		try {
			const response = await getFileById(id, signal);

			setPicture(response.data || null);
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

	const handleUpdate = async (
		data: Omit<Picture, "id" | "createdAt" | "size">,
	): Promise<void> => {
		const signal = createSignal();

		return new Promise((resolve, reject) => {
			startTransition(async () => {
				try {
					const response = await updateFile(id, data, signal);
					setPicture(response.data || null);

					resolve();
				} catch (err: unknown) {
					if (
						err instanceof Error &&
						(err.name === "CanceledError" || err.name === "AbortError")
					)
						return;

					const cleanError = getCleanErrorMessage(err);
					setError(cleanError.message);

					reject(err);
				}
			});
		});
	};

	const handleDelete = async (): Promise<void> => {
		const signal = createSignal();

		return new Promise((resolve, reject) => {
			startTransition(async () => {
				try {
					await deleteFile(id, signal);

					setPicture(null);
					resolve();
				} catch (err: unknown) {
					if (
						err instanceof Error &&
						(err.name === "CanceledError" || err.name === "AbortError")
					)
						return;

					const cleanError = getCleanErrorMessage(err);
					setError(cleanError.message);

					reject(cleanError);
				}
			});
		});
	};

	useEffect(() => {
		fetchPicture();
		return () => abortControllerRef.current?.abort();
	}, [id]);

	return {
		picture,
		setPicture,
		loading,
		error, // Berikan akses ke error state
		isPending,
		fetchPicture,
		handleUpdate,
		handleDelete,
	};
};
