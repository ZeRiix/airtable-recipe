import type { IngredientListPage } from "@vendors/clients-type/bff/duplojsTypesCodegen";

export function usePage() {
	const pageContent = ref<IngredientListPage | null>(null);

	void bffClient
		.post("/ingredient-list-page")
		.whenInformation(
			"ingredientList.pageInformation",
			(({ body }) => {
				pageContent.value = body;
			}),
		);

	return {
		pageContent,
	};
}
