export const getTemporaryUrl = async (imageUrl: string) => {
	const response = await fetch(imageUrl);
	const blob = await response.blob();
	const url = window.URL.createObjectURL(blob);
	return url;
};
