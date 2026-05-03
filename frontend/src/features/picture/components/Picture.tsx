import type { Picture } from "../types";

interface PictureCardProps {
	picture: Picture;
}

const PictureCard = ({ picture }: PictureCardProps) => {
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

export default PictureCard;
