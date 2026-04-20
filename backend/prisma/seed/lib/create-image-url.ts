export const createImageUrlFromUrl = async (
	imageUrl: string,
): Promise<Express.Multer.File> => {
	try {
		const res = await fetch(imageUrl);
		if (!res.ok) throw new Error("Gagal mengambil gambar dari faker");

		const arrBuffer = await res.arrayBuffer();
		const buffer = Buffer.from(arrBuffer);
		// ambil informasi file
		const mimeType = res.headers.get("content-type") || "image/jpg";
		const filename = `seed-${Date.now()}.jpg`;
		// buat fake file
		const mockFile = {
			buffer: buffer,
			originalname: filename,
			mimetype: mimeType,
			size: buffer.length,
			fieldname: "file",
			encoding: "7bit",
		} as Express.Multer.File;
		return mockFile;
	} catch (error) {
		throw error;
	}
};
