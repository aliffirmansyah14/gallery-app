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
		console.log({ width: naturalWidth, height: naturalHeight });

		if (naturalHeight > naturalWidth) {
			setIsPotret(true);
		}
	};

	return (
		<div
			className={`${isPotret ? "h-122 w-full " : "w-full sm:w-146 h-auto "} flex items-center justify-center`}
		>
			<div
				className={`overflow-hidden rounded-2xl ${isPotret ? "h-full" : "h-auto"}`}
			>
				<img
					src={picture.url}
					alt={picture.name}
					onLoad={handleImageLoad}
					className={`object-contain ${isPotret ? "h-full w-full" : "w-full h-auto"}`}
				/>
			</div>
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
