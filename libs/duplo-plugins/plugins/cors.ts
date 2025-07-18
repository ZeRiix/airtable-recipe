import { type Duplo, OkHttpResponse } from "@duplojs/core";

export function cors(allowOrigin: string) {
	return function(instance: Duplo) {
		instance.hook(
			"beforeSend",
			(_request, response) => {
				response.setHeaders({
					"Access-Control-Allow-Origin": allowOrigin,
					"Access-Control-Expose-Headers": `${instance.config.keyToInformationInHeaders}`,
					"Access-Control-Allow-Credentials": "true",
					"Access-Control-Allow-Headers": `${instance.config.keyToInformationInHeaders},content-type,accept,authorization`,
				});
			},
		);
		instance.hook(
			"beforeRouteExecution",
			(request) => {
				if (request.method === "OPTIONS" && request.matchedPath === null) {
					return new OkHttpResponse("cors").setHeader("Access-Control-Allow-Headers", "*");
				}
			},
		);
	};
}
