import type { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { authService } from "../services/auth.service";
import type { AuthRequest } from "../interfaces/auth.interface";

class UserController extends BaseController {
	login = async (req: Request, res: Response) => {
		try {
			const { email, password } = req.body;
			console.log("Request login : ", { email });
			if (!email || !password)
				return this.clientError(res, 401, "Email dan password wajib diisi");

			const result = await authService.login(email, password);
			return this.ok(res, 201, result, "Login berhasil");
		} catch (error: any) {
			if (error.message) {
				return this.clientError(res, 401, error.message);
			}
			return this.fail(res, error);
		}
	};
	getMe = async (req: AuthRequest, res: Response) => {
		try {
			if (!req.user?.userId)
				return this.clientError(res, 403, "Token tidak valid");

			const result = await authService.getUserWithId(req.user.userId);
			if (result) {
				return this.ok(res, 200, result);
			}
		} catch (error) {
			this.fail(res, error);
		}
	};
}

export const userController = new UserController();
