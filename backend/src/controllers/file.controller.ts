import type { Response } from "express";
import { BaseController } from "./BaseController";
import type { AuthRequest } from "../interfaces/auth.interface";
import { fileService, type FileRequest } from "../services/file.service";
import { isIdValid } from "../utils/is-id-valid";
import { isRequestFileValid } from "../utils/is-request-file-valid";
import { getPublicIdImage } from "../utils/get-publicId-image";

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
	getAllFiles = async (req: AuthRequest, res: Response) => {
		console.log(
			`Request get all files ${new Date().toString()} : ${req.user?.userId} `,
		);
		try {
			const result = await fileService.getFiles();

			return this.ok(res, 200, result);
		} catch (error) {
			this.fail(res, error);
		}
	};
	getFileById = async (req: AuthRequest, res: Response) => {
		const id = req.params.id;
		if (!isIdValid(id)) return this.clientError(res, 404, "Id not found");
		console.log(
			`Request get file id:${id} ${new Date().toString()} : ${req.user?.userId} `,
		);
		try {
			const result = await fileService.getFileById(id);

			return this.ok(res, 200, result);
		} catch (error) {
			this.fail(res, error);
		}
	};
	update = async (req: AuthRequest, res: Response) => {
		const id = req.params.id;
		const requestBody = req.body;

		console.log(
			`Request update file id:${id} : ${JSON.stringify(requestBody)} `,
		);

		if (!isIdValid(id)) return this.clientError(res, 404, "Id not found");

		if (!isRequestFileValid(Object.keys(requestBody))) {
			return this.clientError(res, 400, "Semua field request harus diisi");
		}

		try {
			const isFileExist = await fileService.getFileById(id);

			if (!isFileExist) return this.clientError(res, 404, "File not found");

			const result = await fileService.updateToDb(id, requestBody);

			return this.ok(res, 201, result, "Update berhasil");
		} catch (error) {
			this.fail(res, error);
		}
	};
	delete = async (req: AuthRequest, res: Response) => {
		const id = req.params.id;
		console.log(`Request delete file id:${id}`);

		try {
			if (!isIdValid(id)) return this.clientError(res, 404, "Id note found");

			const file = await fileService.getFileById(id);
			if (!file) return this.clientError(res, 404, "File tidak ditemukan");

			const pulicIdImage = getPublicIdImage(file.url);

			const result = await fileService.deleteToDb(id);

			// delete imagee tidak urgent agar server tidak crash
			if (pulicIdImage) {
				const resCloudinary =
					await fileService.deleteFromCloudinary(pulicIdImage);
				console.log("Delete image status : ", resCloudinary.result);
			}

			return this.ok(res, 200, result, "Delete file success");
		} catch (error) {
			this.fail(res, error);
		}
	};
}

export const fileController = new FileController();
