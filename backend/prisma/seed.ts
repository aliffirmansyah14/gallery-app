import { prisma } from "../src/config/database";
import { seedFile } from "./seed/file.seed";
import { seedUsers } from "./seed/user.seed";

async function main() {
	await seedUsers();
	await seedFile();
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async e => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
