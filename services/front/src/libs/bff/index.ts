import { envs } from "@/libs/envs";
import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import type { CodegenRoutes } from "@vendors/clients-type/bff/duplojsTypesCodegen";

export type BffClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

const { sonnerError, sonnerMessage, sonnerWarning } = useSonner();
const { enableLoader, disableLoader } = useLoader();

const defaultRequestTimeout = 100000;

declare module "@duplojs/http-client" {
	interface HttpClientRequestInit {
		disabledLoader?: boolean;
		loaderId?: string;
		timeoutId?: number;
		requestTimeout?: number | boolean;
	}
}

declare global {
	interface Window {
		bffClient: HttpClient<BffClientRoute>;
	}
}

export const bffClient = new HttpClient<BffClientRoute>({
	baseUrl: envs.VITE_BFF_ENTRYPOINT_BASE_URL,
})
	.setDefaultRequestParams({
		mode: "cors",
		credentials: "include",
	})
	.setInterceptor(
		"request",
		(requestDefinition) => {
			if (requestDefinition.paramsRequest.disabledLoader !== true) {
				requestDefinition.paramsRequest.loaderId = enableLoader();
			}

			if (
				!requestDefinition.paramsRequest.signal
				&& requestDefinition.paramsRequest.requestTimeout !== false
			) {
				const requestTimeout = requestDefinition.paramsRequest.requestTimeout;

				const controller = new AbortController();
				requestDefinition.paramsRequest.timeoutId = setTimeout(
					() => {
						void controller.abort();
					},
					requestTimeout === true || !requestTimeout
						? defaultRequestTimeout
						: requestTimeout,
				);

				requestDefinition.paramsRequest.signal = controller.signal;
			}

			return requestDefinition;
		},
	)
	.setInterceptor(
		"response",
		(response) => {
			if (response.requestDefinition.paramsRequest.loaderId) {
				disableLoader(response.requestDefinition.paramsRequest.loaderId);
			}

			if (response.requestDefinition.paramsRequest.timeoutId) {
				clearTimeout(response.requestDefinition.paramsRequest.timeoutId);
			}

			const sonnerMessageKey = `responses.${response.information}`;

			if (i18n.global.te(sonnerMessageKey)) {
				const sonnerMessageContent = i18n.global.t(sonnerMessageKey);

				if (response.ok === true) {
					sonnerMessage(sonnerMessageContent);
				} else if (response.ok === false) {
					sonnerWarning(sonnerMessageContent);
				} else if (response.ok === null) {
					sonnerError(sonnerMessageContent);
				}
			}

			return response;
		},
	);

bffClient.hooks.add({
	type: "error",
	callback(_error, requestDefinition) {
		if (requestDefinition.paramsRequest.loaderId) {
			disableLoader(requestDefinition.paramsRequest.loaderId);
		}
	},
});

// three checking bug auto import
window.bffClient = bffClient;
