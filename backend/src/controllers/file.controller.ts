import type { Response } from "express";
import { BaseController } from "./BaseController";
import type { AuthRequest } from "../interfaces/auth.interface";
import { fileService } from "../services/file.service";

class FileController extends BaseController {
	uploadFile = async (req: AuthRequest, res: Response) => {
		try {
			const file = req.file;

			if (!file) return this.clientError(res, 400, "File belum di tambahkan");
			// uploadke cloudnary
			const cloudinaryResponse = await fileService.uploadToCloudinary(file);
			console.log(cloudinaryResponse);
			const fileName = file.originalname.split(".")[0] || "default_name";

			const savedFile = await fileService.saveToDb({
				name: fileName,
				mimeType: file.mimetype,
				size: file.size,
				url: cloudinaryResponse.secure_url,
				blurDataUrl: null,
			});

			return this.ok(res, 201, savedFile, "Upload berhasil!");
		} catch (error) {
			this.fail(res, error);
		}
	};
}

export const fileController = new FileController();
