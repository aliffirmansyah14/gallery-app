import { PictureContext } from "@/features/picture/hooks/usePictureContext";
import { usePictures } from "@/features/picture/hooks/usePirctures";
import type { Picture } from "@/features/picture/types";
import { useMemo } from "react";

export type PictureContextTypes = {
	pictures: Picture[];
	setPictures: React.Dispatch<React.SetStateAction<Picture[]>>;
	loading: boolean;
	refetch: () => Promise<void>;
};

export const PictureProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const { fetchPictures, loading, pictures, setPictures } = usePictures();

	// perlu memo awalupun react 19 sudah auto
	const contextValue: PictureContextTypes = useMemo(
		() => ({
			pictures,
			setPictures,
			loading,
			refetch: fetchPictures,
		}),
		[loading, pictures, fetchPictures],
	);

	return <PictureContext value={contextValue}>{children}</PictureContext>;
};
