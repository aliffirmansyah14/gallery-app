import { prisma } from "../config/database";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const authService = {
	async login(email: string, password: string) {
		const user = await prisma.user.findUnique({
			select: {
				id: true,
				email: true,
				password: true,
			},
			where: { email },
		});
		if (!user || !(await bcrypt.compare(password, user.password))) {
			throw new Error("Email atau password salah");
		}
		const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
			expiresIn: "1d",
		});
		return { token, user: { id: user.id, email: email } };
	},
};
