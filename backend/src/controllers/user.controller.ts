import type { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { authService } from "../services/auth.service";

class UserController extends BaseController {
	login = async (req: Request, res: Response) => {
		try {
			const { email, password } = req.body;

			if (!email || !password)
				return this.clientError(res, 401, "Email dan password wajib diisi");

			const result = await authService.login(email, password);
			console.log(result.token);
			return this.ok(res, 201, result, "Login berhasil");
		} catch (error: any) {
			return this.fail(res, error);
		}
	};
}

export const userController = new UserController();
