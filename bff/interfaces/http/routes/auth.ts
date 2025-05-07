import { iWantNoUserWithEmail, iWantUserExistByEmail } from "../checkers/user";
import { prismaClient } from "@interfaces/providers/prisma";
import { TokenProvider } from "@interfaces/providers/token";
import { envs } from "@interfaces/envs";

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

			const token = TokenProvider.generateToken({
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

useBuilder()
	.createRoute("POST", "/login")
	.extract({
		body: zod.object({
			email: zod.string().email(),
			password: zod.string(),
		}),
	})
	.presetCheck(
		iWantUserExistByEmail,
		(pickup) => pickup("body").email,
	)
	.cut(
		({ pickup, dropper }) => {
			const { user, body } = pickup(["user", "body"]);

			if (user.password !== body.password) {
				// it is forbidden to say that the password is wrong
				return new NotFoundHttpResponse("user.notfound");
			}

			return dropper({ user });
		},
		["user"],
		makeResponseContract(NotFoundHttpResponse, "user.notfound"),
	)
	.handler(
		(pickup) => {
			const { id: userId, username, email } = pickup("user");

			const token = TokenProvider.generateToken({
				userId,
				username,
				email,
			});

			return new OkHttpResponse("user.login")
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
		makeResponseContract(OkHttpResponse, "user.login"),
	);
