import { HttpClient } from "@duplojs/http-client";
import { envs } from "../../envs";
import { type AirtableRoutes } from "./types/airtableRoutes";

export class AirtableProvider {
	private static httpClient: HttpClient<AirtableRoutes>;

	static {
		this.httpClient = new HttpClient<AirtableRoutes>({
			baseUrl: envs.AIRTABLE_BASE_URL,
		})
			.setDefaultRequestParams({
				headers: {
					get authorization() {
						return `Bearer ${envs.AIRTABLE_API_KEY}`;
					},
				},
			});
	}
}
