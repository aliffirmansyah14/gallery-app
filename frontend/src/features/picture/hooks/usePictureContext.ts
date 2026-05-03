import type { PictureContextTypes } from "@/providers/PictureProvider";
import { createContext, use } from "react";

export const PictureContext = createContext<PictureContextTypes | undefined>(
	undefined,
);

export const usePictureContext = (): PictureContextTypes => {
	const context = use(PictureContext);
	if (!context) throw new Error("useFile digunakan harus didalam FileProvider");

	return context;
};
