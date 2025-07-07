import { Recipe } from "@business/entities/recipe";
import { iWantRecipeExistById } from "@interfaces/http/checkers/recipe";

useBuilder()
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
