
import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type Message, type OllamaRoutes } from "./types/ollamaRoute";

type OllamaHttpRoute = TransformCodegenRouteToHttpClientRoute<
	OllamaRoutes
>;

export class OllamaProvider {
	private static httpClient: HttpClient<OllamaHttpRoute>;

	public static initOllamaApi() {
		return this.httpClient
			.post(
				"/api/generate",
				{
					body: {
						model: "qwen2.5:3b",
						prompt: "test prompt",
						stream: false,
						format: "json",
					},
				},

			).iWantCode("200");
	}

	public static getOllamaConfig() {
		return this.httpClient
			.get(
				"/api/tags",
			).iWantCode("200");
	}

	public static sendMessage(messages: Message[]) {
		return this.httpClient.post(
			"/api/chat",
			{
				body: {
					model: "qwen2.5:3b",
					messages,
					format: "json",
					stream: false,
				},
			},
		).iWantCode("200");
	}

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.OLLAMA_BASE_URL,
		});
	}
}
