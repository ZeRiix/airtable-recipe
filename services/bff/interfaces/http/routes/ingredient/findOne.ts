import { Ingredient } from "@business/entities/ingredient";
import { iWantIngredientExistById } from "@interfaces/http/checkers/ingredient";

useBuilder()
	.createRoute("POST", "/ingredient-find-one")
	.extract({
		body: {
			ingredientId: zod.string(),
		},
	})
	.presetCheck(
		iWantIngredientExistById,
		(pickup) => pickup("ingredientId"),
	)
	.handler(
		(pickup) => {
			const { ingredient } = pickup(["ingredient"]);

			return new OkHttpResponse("ingredient.found", ingredient);
		},
		makeResponseContract(OkHttpResponse, "ingredient.found", Ingredient.index),
	);
