import { type Duplo } from "@duplojs/core";

export function duploCors(allowOrigin: string) {
	return function(instance: Duplo) {
		instance.hook(
			"beforeRouteExecution",
			(request) => {
				if (request.method !== "OPTIONS") {
					return;
				}

				return new NoContentHttpResponse("ALLOW_CORS")
					.setHeaders({
						"Access-Control-Allow-Headers": "*",
					});
			},
		);

		instance.hook("beforeSend", (_request, response) => {
			response.setHeaders({
				"Access-Control-Allow-Origin": allowOrigin,
				"Access-Control-Expose-Headers": "information,content-type",
				"Access-Control-Allow-Credentials": "true",
				"Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
				"Access-Control-Allow-Headers": "content-type,information,accept",
			});
		});
	};
}
