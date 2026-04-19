import type { Response } from "express";

export abstract class BaseController {
	protected ok<T>(res: Response, data?: T) {
		return res.status(200).json({ success: true, data });
	}

	protected fail(res: Response, error: any) {
		return res.status(500).json({ success: false, message: error.message });
	}
}
