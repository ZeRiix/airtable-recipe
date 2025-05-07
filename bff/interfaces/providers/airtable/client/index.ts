import { envs } from "@interfaces/envs";
import Airtable, { type Base } from "airtable";

export class AirtableClient {
	protected static airtable: typeof Airtable;

	public static db: Base;

	static {
		Airtable.configure({
			apiKey: envs.AIRTABLE_API_KEY,
			endpointUrl: envs.AIRTABLE_BASE_URL,
		});
		this.airtable = Airtable;

		this.db = this.airtable.base(envs.AIRTABLE_BDD);
	}
}
