const getPublicIdImage = (url: string) => {
	//  smaple url https://res.cloudinary.com/dxlsjyr2f/image/upload/v1776690786/Gallery/swt4bcxndnmenr8pnke9.jpg
	const partsUrl = url.split("/");

	// ambil filename dari last index url swt4bcxndnmenr8pnke
	const fileName = partsUrl.pop()?.split(".")[0];
	// ambil index upload + 2 jika ada foldername maka tidak undefined
	const folderName = partsUrl.slice(partsUrl.indexOf("upload") + 2)?.join("");

	return folderName ? `${folderName}/${fileName}` : fileName;
};

export { getPublicIdImage };
