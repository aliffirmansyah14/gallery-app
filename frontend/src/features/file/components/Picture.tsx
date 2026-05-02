import type { File } from "../types";

interface PictureCardProps {
	picture: File;
}

const Picture = ({ picture }: PictureCardProps) => {
	return (
		<div className="mb-4 break-inside-avoid">
			<img
				className="h-auto w-full rounded-lg"
				src={picture.url}
				alt={picture.name}
			/>
		</div>
	);
};

export default Picture;
