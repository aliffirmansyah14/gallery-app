import type { File } from "../types";

interface PictureCardProps {
	picture: File;
}

const Picture = (props: PictureCardProps) => {
	console.log(props);
	return (
		<div className="mb-4 break-inside-avoid">
			<img
				className="h-auto w-full rounded-lg"
				src={`https://picsum.photos/200/300`}
				alt="gambar-dummy"
			/>
		</div>
	);
};

export default Picture;
