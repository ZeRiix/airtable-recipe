import { envs } from "@interfaces/envs";
import { iWantUserExistByEmail } from "@interfaces/http/checkers/user";
import { TokenProvider } from "@interfaces/providers/token";

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

			const token = TokenProvider.generate({
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
