import { airtableProvider } from "@interfaces/providers/airtable";

useBuilder()
	.createRoute("GET", "/test")
	.handler(async() => {
		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
		const recipe = await airtableProvider.recipe.findPerPage(1, 10);

		return new OkHttpResponse("fef", recipe);
	});
