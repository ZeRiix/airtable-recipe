import type { Ingredient } from "@vendors/clients-type/bff/duplojsTypesCodegen";

export function useGetIngredient(
	ingredientId: string,
	whenFindError: () => void,
) {
	const ingredient = ref<Ingredient | null>(null);

	void bffClient
		.post(
			"/ingredient-find-one",
			{ body: { ingredientId } },
		)
		.whenInformation(
			"ingredient.notfound",
			whenFindError,
		)
		.whenInformation(
			"ingredient.found",
			({ body }) => {
				ingredient.value = body;
			},
		)
		.whenRequestError(
			whenFindError,
		);

	return {
		ingredient,
	};
}
