import type { Recipe } from "@vendors/clients-type/bff/duplojsTypesCodegen";

export function useGetRecipe(
	recipeId: string,
	whenFindError: () => void,
) {
	const recipe = ref<Recipe | null>(null);

	void bffClient
		.post(
			"/recipe-find-one",
			{ body: { recipeId } },
		)
		.whenInformation(
			"recipe.notfound",
			whenFindError,
		)
		.whenInformation(
			"recipe.found",
			({ body }) => {
				recipe.value = body;
			},
		)
		.whenRequestError(
			whenFindError,
		);

	return {
		recipe,
	};
}
