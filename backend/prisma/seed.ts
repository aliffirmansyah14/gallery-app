import { prisma } from "../src/config/database";
import { seedUsers } from "./seed/user.seed";

async function main() {
	await seedUsers();
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async e => {
		console.error("error saat seed admin ", e);
		await prisma.$disconnect();
		process.exit(1);
	});
