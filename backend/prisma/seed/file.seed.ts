import { faker, th } from "@faker-js/faker";
import { fileService } from "../../src/services/file.service";
import { createImageUrlFromUrl } from "./lib/create-image-url";

export async function seedFile() {
	try {
		const fakeImage = faker.image.urlPicsumPhotos();
		const mockFile = await createImageUrlFromUrl(fakeImage);

		const cloudinaryRes = await fileService.uploadToCloudinary(mockFile);

		const savedFile = await fileService.saveToDb({
			mimeType: mockFile.mimetype,
			name: mockFile.originalname,
			size: mockFile.size,
			blurDataUrl: null,
			url: cloudinaryRes.secure_url,
		});
		console.log(
			"susccess seed file image: ",
			JSON.stringify(savedFile, null, 2),
		);
	} catch (error: any) {
		throw new Error("Error saat seed file : ", error);
	}
}
