import { PictureContext } from "@/features/picture/hooks/usePictureContext";
import { usePictures } from "@/features/picture/hooks/usePirctures";
import * as fileService from "@/features/picture/services";
import type { Picture } from "@/features/picture/types";
import { getCleanErrorMessage } from "@/lib/get-clean-error-message";
import { useTransition } from "react";

export type PictureContextTypes = {
	pictures: Picture[];
	setPictures: (files: Picture[]) => void;
	loading: boolean;
	isUploading: boolean;
	handleUpload: (file: File) => Promise<void>;
	refetch: () => Promise<void>;
};

export const PictureProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const { fetchPictures, loading, pictures, setPictures } = usePictures();
	const [isPending, startTransition] = useTransition();

	const handleUpload = async (file: File): Promise<void> => {
		const formData = new FormData();
		formData.set("file", file);

		return new Promise((resolve, reject) => {
			startTransition(async () => {
				try {
					const response = await fileService.uploadFile(formData);

					if (response.success && response.data) {
						setPictures(p => [...p, response.data as Picture]);
					}

					resolve();
				} catch (error: any) {
					const err = getCleanErrorMessage(error);
					console.log("Error saat upload file : ", err);

					reject(err);
				}
			});
		});
	};

	const contextValue: PictureContextTypes = {
		pictures,
		setPictures,
		loading,
		refetch: fetchPictures,
		handleUpload,
		isUploading: isPending,
	};

	return <PictureContext value={contextValue}>{children}</PictureContext>;
};
