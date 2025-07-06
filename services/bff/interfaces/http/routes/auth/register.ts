import { prismaClient } from "@interfaces/providers/prisma";
import { TokenProvider } from "@interfaces/providers/token";
import { envs } from "@interfaces/envs";
import { iWantNoUserWithEmail } from "@interfaces/http/checkers/user";

useBuilder()
	.createRoute("POST", "/register")
	.extract({
		body: zod.object({
			username: zod.string(),
			email: zod.string().email(),
			password: zod.string(),
		}),
	})
	.presetCheck(
		iWantNoUserWithEmail,
		(pickup) => pickup("body").email,
	)
	.cut(
		async({ pickup, dropper }) => {
			const { username, email, password } = pickup("body");

			const user = await prismaClient.user.create({
				data: {
					username,
					email,
					password,
				},
			});

			return dropper({ user });
		},
		["user"],
	)
	.handler(
		(pickup) => {
			const { id: userId, username, email } = pickup("user");

			const token = TokenProvider.generate({
				userId,
				username,
				email,
			});

			return new OkHttpResponse("user.register")
				.setCookie(
					"token",
					token,
					{
						httpOnly: false,
						secure: true,
						sameSite: "none",
						path: "/",
						domain: envs.FRONT_BASE_URL,
					},
				);
		},
		makeResponseContract(OkHttpResponse, "user.register"),
	);
