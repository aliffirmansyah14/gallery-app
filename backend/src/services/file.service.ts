import cloudinary from "../config/cloudinary";
import { prisma } from "../config/database";

const FOLDER_NAME = "Gallery";

type FileRequest = {
	name: string;
	mimeType: string;
	url: string;
	size: number;
	blurDataUrl: string | null;
};

export const fileService = {
	async uploadToCloudinary(file: Express.Multer.File): Promise<any> {
		return new Promise((resolve, reject) => {
			const uploadStream = cloudinary.uploader.upload_stream(
				{
					folder: FOLDER_NAME,
				},
				(error, result) => {
					if (error) return reject(error);
					return resolve(result);
				},
			);
			uploadStream.end(file.buffer);
		});
	},
	async saveToDb({ mimeType, name, size, url, blurDataUrl }: FileRequest) {
		return prisma.file.create({
			data: {
				name,
				mimeType,
				url,
				size,
				blurDataUrl,
			},
			select: {
				name: true,
				mimeType: true,
				url: true,
				blurDataUrl: true,
			},
		});
	},
};
