import type { Response } from "express";

export abstract class BaseController {
	protected ok<T>(
		res: Response,
		statusCode: number = 200,
		data?: T,
		message: string = "OK",
	) {
		return res.status(statusCode).json({ success: true, data, message });
	}

	protected clientError(
		res: Response,
		statusCode: number = 400,
		message: string = "Bad Request",
	) {
		return res.status(statusCode).json({ success: false, message });
	}

	protected fail(res: Response, error: any) {
		const message =
			error instanceof Error ? error.message : "Internal Server Error";
		return res.status(500).json({ success: false, message });
	}
}
