import { endpointUserRouteSchema } from "../schemas/user";
import { mustBeConnectedRouteBuilder } from "../security/mustBeConnected";

mustBeConnectedRouteBuilder()
	.createRoute("GET", "/me")
	.handler(
		(pickup) => {
			const user = pickup("user");
			return new OkHttpResponse("user.found", user);
		},
		makeResponseContract(OkHttpResponse, "user.found", endpointUserRouteSchema),
	);
