import bcrypt from "bcryptjs";
import type { User } from "../../src/generated/prisma/client";
import { prisma } from "../../src/config/database";

const USERS: Pick<User, "email" | "address" | "name" | "role" | "password">[] =
	[
		{
			email: "admin@example.com",
			address: "lenteng",
			name: "admin",
			role: "ADMIN",
			password: "super_admin",
		},
		{
			email: "user@example.com",
			address: "lenteng",
			name: "alif",
			role: "USER",
			password: "user1234",
		},
	];

export async function seedUsers() {
	try {
		for (const user of USERS) {
			user.password = await bcrypt.hash(user.password, 10);
		}
		const users = await prisma.user.createMany({
			data: USERS,
		});
		console.log("Successed seed users: ", JSON.stringify(users, null, 2));
	} catch (error: any) {
		throw new Error("Error saat seed users : ", error);
	}
}
