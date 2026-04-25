const size = ["300/250", "200/300", "100/50", "300/400", "200/250", "200/200"];

const ListPicture = () => {
	return (
		<div className="columns-2 md:columns-3 lg:columns-4 gap-4">
			{Array.from({ length: 100 }).map((_, i) => {
				const getRandomSize = Math.floor(Math.random() * size.length);
				return (
					<div key={i.toString()} className="mb-4 break-inside-avoid">
						<img
							className="h-auto w-full rounded-lg"
							src={`https://picsum.photos/${size[getRandomSize]}`}
							alt="gambar-dummy"
						/>
					</div>
				);
			})}
		</div>
	);
};

export default ListPicture;
