import { useState } from "react";
import type { Picture } from "../types";

interface DetailPicture {
	picture: Picture;
	onClick?: () => void;
}

const DetailPicture = ({ picture }: DetailPicture) => {
	const [isPotret, setIsPotret] = useState<boolean>(false);

	const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
		const { naturalWidth, naturalHeight } = e.currentTarget;

		if (naturalHeight > naturalWidth) {
			setIsPotret(true);
		}
	};

	return (
		<div
			className={`${isPotret ? "w-max h-max" : "w-full sm:w-max h-max"} absolute inset-1/2 -translate-1/2 rounded-2xl overflow-hidden zoom-in-95 fade-in-0 animate-in group hover:bg-black/90`}
		>
			<img
				src={picture.url}
				alt={picture.name}
				onLoad={handleImageLoad}
				width={isPotret ? "auto" : "587"}
				height={isPotret ? "488" : "auto"}
				className={`object-contain ${isPotret ? "h-122 w-auto" : "w-147 h-auto"}`}
			/>
		</div>
	);
};

export default DetailPicture;

// <img
// 	src={picture.url}
// 	alt={picture.name}
// 	onLoad={handleImageLoad}
// 	className={`${isPotret ? "h-full w-full md:w-auto max-h-[calc(100dvh-10rem)]" : "h-auto w-full "}`}
// />
