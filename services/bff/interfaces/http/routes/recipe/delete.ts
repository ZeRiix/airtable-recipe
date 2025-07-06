import { airtableProvider } from "@interfaces/providers/airtable";
import { iWantRecipeExistById } from "@interfaces/http/checkers/recipe";
import { mustBeConnectedRouteBuilder } from "@interfaces/http/security/mustBeConected";

mustBeConnectedRouteBuilder()
	.createRoute("POST", "/recipe-delete")
	.extract({
		body: {
			recipeId: zod.string(),
		},
	})
	.presetCheck(
		iWantRecipeExistById,
		(pickup) => pickup("recipeId"),
	)
	.handler(
		async(pickup) => {
			const { recipe } = pickup(["recipe"]);

			await airtableProvider.recipeEntity
				.delete({
					recipeId: recipe.id,
				});

			return new OkHttpResponse("recipe.deleted");
		},
		makeResponseContract(OkHttpResponse, "recipe.deleted"),
	);
