import multer from "multer";

const storage = multer.memoryStorage();

const LIMIT_UPLOAD_SIZE = 5 * 1024 * 1024;

export const upload = multer({
	storage,
	limits: { fileSize: LIMIT_UPLOAD_SIZE },
});
