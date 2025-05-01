import { type Duplo } from "@duplojs/core";

export function duploDebug() {
	return function(instance: Duplo) {
		if (instance.config.environment === "DEV") {
			instance.hook(
				"onError",
				(request, error) => {
					// eslint-disable-next-line no-console
					console.log(`${request.method}:${request.path}`, error);
				},
			);
		}
	};
}
