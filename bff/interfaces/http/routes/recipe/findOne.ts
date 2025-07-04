import { Recipe } from "@business/entities/recipe";
import { iWantRecipeExistById } from "@interfaces/http/checkers/recipe";
import { mustBeConnectedRouteBuilder } from "@interfaces/http/security/mustBeConected";

mustBeConnectedRouteBuilder()
	.createRoute("POST", "/recipe-find-one")
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
		(pickup) => {
			const { recipe } = pickup(["recipe"]);

			return new OkHttpResponse("recipe.found", recipe);
		},
		makeResponseContract(OkHttpResponse, "recipe.found", Recipe.index),
	);
