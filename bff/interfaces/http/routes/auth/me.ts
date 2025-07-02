import { User } from "@business/entities/user";
import { mustBeConnectedRouteBuilder } from "@interfaces/http/security/mustBeConected";

mustBeConnectedRouteBuilder()
	.createRoute("GET", "/me")
	.handler(
		(pickup) => {
			const user = pickup("user");
			return new OkHttpResponse("user.found", user);
		},
		makeResponseContract(OkHttpResponse, "user.found", User.index),
	);
