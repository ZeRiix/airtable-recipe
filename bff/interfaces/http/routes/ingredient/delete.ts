import { iWantIngredientExistById } from "@interfaces/http/checkers/ingredient";
import { mustBeConnectedRouteBuilder } from "@interfaces/http/security/mustBeConected";
import { airtableProvider } from "@interfaces/providers/airtable";

mustBeConnectedRouteBuilder()
	.createRoute("POST", "ingredient-delete")
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
		async(pickup) => {
			const { ingredient } = pickup(["ingredient"]);

			await airtableProvider.ingredientEntity
				.delete({
					ingredientId: ingredient.id,
				});

			return new OkHttpResponse("ingredient.deleted");
		},
		makeResponseContract(OkHttpResponse, "ingredient.deleted"),
	);
