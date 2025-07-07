import { prismaClient } from "@interfaces/providers/prisma";
import { TokenProvider } from "@interfaces/providers/token";
import { envs } from "@interfaces/envs";
import { iWantNoUserWithEmail } from "@interfaces/http/checkers/user";
import { userRules } from "@vendors/entity-rules";

const { username, password } = userRules;

useBuilder()
	.createRoute("POST", "/register")
	.extract({
		body: zod.object({
			username: zod.string()
				.min(username.min)
				.max(username.max),
			email: zod.string().email(),
			password: zod.string()
				.min(password.min)
				.max(password.max),
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

			return new OkHttpResponse("user.register", { token })
				.setCookie(
					"token",
					token,
					{
						httpOnly: false,
						secure: false,
						sameSite: "lax",
						path: "/",
						domain: envs.FRONT_DOMAIN,
					},
				);
		},
		makeResponseContract(OkHttpResponse, "user.register", zod.object({ token: zod.string() })),
	);
