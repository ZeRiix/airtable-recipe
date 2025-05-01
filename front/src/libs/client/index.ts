import { envs } from "@/libs/envs";
import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import type { CodegenRoutes } from "./types/duplojsTypesCodegen";

export type HttpClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes>;

export const httpClient = new HttpClient<HttpClientRoute>({
	baseUrl: envs.VITE_BFF_ENTRYPOINT_BASE_URL,
})
	.setDefaultRequestParams({
		mode: "cors",
	});
