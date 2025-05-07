import { envs } from "@interfaces/envs";
import { PrismaClient, type Prisma } from "@prisma/output/client";

const prismaClient = new PrismaClient();

export {
	prismaClient,
	type Prisma,
};

if (envs.DB_CONNECTION) {
	await prismaClient.$connect();
}
