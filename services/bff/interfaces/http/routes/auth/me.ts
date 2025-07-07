import { User } from "@business/entities/user";
import { mustBeConnectedRouteBuilder } from "@interfaces/http/security/mustBeConected";

mustBeConnectedRouteBuilder()
	.createRoute("GET", "/me")
	.handler(
		(pickup) => {
			const { username, email, id } = pickup("user");
			// usecase
			return new OkHttpResponse(
				"user.found",
				{
					username,
					email,
					id,
				},
			);
		},
		makeResponseContract(OkHttpResponse, "user.found", User.index.omit({ password: true })),
	);
