import type { RecipeListPage } from "@vendors/clients-type/bff/duplojsTypesCodegen";

export function usePage() {
	const pageContent = ref<RecipeListPage | null>(null);

	void bffClient
		.post("/recipe-list-page")
		.whenInformation(
			"recipeList.pageInformation",
			(({ body }) => {
				pageContent.value = body;
			}),
		);

	return {
		pageContent,
	};
}
