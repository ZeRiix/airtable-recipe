import { type GetTypeInput } from "@duplojs/core";
import { prismaClient, type Prisma } from "@interfaces/providers/prisma";

const inputUserExist = createTypeInput<{
	id: string;
	email: string;
}>();

const userExistCheck = createChecker("userExist")
	.handler(
		async({ inputName, value }: GetTypeInput<typeof inputUserExist>, output) => {
			let where: Prisma.userFindFirstArgs["where"] = undefined;

			if (inputName === "id") {
				where = {
					id: value,
				};
			} else if (inputName === "email") {
				where = {
					email: value,
				};
			}

			const user = await prismaClient.user.findFirst({
				where,
			});

			if (user) {
				return output("user.exist", user);
			} else {
				return output("user.notfound", null);
			}
		},
	);

export const iWantUserExist = createPresetChecker(
	userExistCheck,
	{
		result: "user.exist",
		catch: () => new NotFoundHttpResponse("user.notfound"),
		indexing: "user",
	},
);

export const iWantUserExistById = createPresetChecker(
	userExistCheck,
	{
		result: "user.exist",
		catch: () => new NotFoundHttpResponse("user.notfound"),
		indexing: "user",
		transformInput: (input: string) => ({
			inputName: <const>"id",
			value: input,
		}),
	},
);

export const iWantNoUserWithEmail = createPresetChecker(
	userExistCheck,
	{
		result: "user.notfound",
		catch: () => new ConflictHttpResponse("user.exist"),
		transformInput: inputUserExist.email,
	},
);

export const iWantUserExistByEmail = createPresetChecker(
	userExistCheck,
	{
		result: "user.exist",
		catch: () => new NotFoundHttpResponse("user.notfound"),
		indexing: "user",
		transformInput: inputUserExist.email,
	},
);
