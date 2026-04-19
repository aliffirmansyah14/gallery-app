import type { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { AuthRequest } from "../interfaces/auth.interface";
import { JWT_SECRET } from "../services/auth.service";

type DecodedToken = {
	userId: string;
} & jwt.JwtPayload;

export const protect = (
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) => {
	const authHeader = req.headers?.authorization;
	const token = authHeader && authHeader.split(" ")[1]; // Format: "Bearer <token>"

	if (!token) {
		return res.status(401).json({
			success: false,
			message: "Akses ditolak. Silakan login terlebih dahulu.",
		});
	}

	try {
		console.log({ token });
		const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

		console.log(decoded);
		req.user = { userId: decoded.userId };

		next();
	} catch (error) {
		return res.status(403).json({
			success: false,
			message: "Token tidak valid atau sudah kadaluwarsa.",
		});
	}
};
