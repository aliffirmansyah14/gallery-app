import { Link } from "react-router-dom";
import type { Picture } from "../types";

interface PictureCardProps {
	picture: Picture;
}

const PictureCard = ({ picture }: PictureCardProps) => {
	return (
		<Link
			to={`/detail/${picture.id}`}
			className="mb-4 block break-inside-avoid"
		>
			<img
				className="h-auto w-full rounded-lg"
				src={picture.url}
				alt={picture.name}
			/>
		</Link>
	);
};

export default PictureCard;
