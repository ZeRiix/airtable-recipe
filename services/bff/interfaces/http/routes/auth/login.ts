import { envs } from "@interfaces/envs";
import { iWantUserExistByEmail } from "@interfaces/http/checkers/user";
import { TokenProvider } from "@interfaces/providers/token";
import { userRules } from "@vendors/entity-rules";

const { password } = userRules;

useBuilder()
	.createRoute("POST", "/login")
	.extract({
		body: zod.object({
			email: zod.string().email(),
			password: zod.string()
				.min(password.min)
				.max(password.max),
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

			return new OkHttpResponse("user.login", { token })
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
		makeResponseContract(OkHttpResponse, "user.login", zod.object({ token: zod.string() })),
	);
