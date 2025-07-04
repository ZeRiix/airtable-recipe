/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Recipe } from "@business/entities/recipe";
import { mustBeConnectedRouteBuilder } from "@interfaces/http/security/mustBeConected";
import { airtableProvider } from "@interfaces/providers/airtable";

mustBeConnectedRouteBuilder()
	.createRoute("POST", "/recipe-create")
	.extract({
		body: zod.object({
			recipeName: zod.string(),
			description: zod.string(),
			servings: zod.number(),
			calories: zod.number(),
			proteins: zod.number(),
			carbohydrates: zod.number(),
			fats: zod.number(),
			dishType: zod.enum(Recipe.dishTypeEnum.toTuple()),
			foodIntolerances: zod.enum(Recipe.intoleranceEnum.toTuple()).array(),
			recipePhoto: zod.string().url().optional(),
			ingredientIds: zod.array(zod.string()),
		}),
	})
	.cut(
		async({ pickup, dropper }) => {
			const { ingredientIds } = pickup("body");

			const result = await Promise.all(
				ingredientIds.map(
					async(ingredientId) => airtableProvider.ingredientEntity
						.findOne({ ingredientId }),

				),
			);

			const allIngredientsExist = result.every(({ code }) => code === 200);

			if (!allIngredientsExist) {
				return new NotFoundHttpResponse("ingredient.notfound");
			}

			const ingredientList = result
				.filter(
					(res) => res.code === 200,
				)
				.map(
					({ body }) => ({
						...body.fields,
						id: body.id,
					}),
				);

			return dropper({ ingredientList });
		},
		["ingredientList"],
		makeResponseContract(NotFoundHttpResponse, "ingredient.notfound"),
	)
	.handler(
		async(pickup) => {
			const {
				body: {
					recipeName,
					description,
					servings,
					calories,
					proteins,
					carbohydrates,
					fats,
					dishType,
					foodIntolerances,
					recipePhoto,
				},
				ingredientList,
			} = pickup(["body", "ingredientList"]);

			await airtableProvider.recipeEntity
				.create({
					"Recipe Name": recipeName,
					Description: description,
					Servings: servings,
					Calories: calories,
					Proteins: proteins,
					Carbohydrates: carbohydrates,
					Fats: fats,
					// flemme de faire un filter
					Vitamins: ingredientList.map((ingredient) => ingredient.Vitamins).toString(),
					Minerals: ingredientList.map((ingredient) => ingredient.Minerals).toString(),
					"Dish Type": dishType,
					"Food Intolerances": foodIntolerances,
					"Recipe Photo": recipePhoto,
					Ingredients: ingredientList.map((ingredient) => ingredient.id),
					"Recipe Summary": {
						state: "error",
						errorType: "enterpriseRestricted",
						value: "",
						isStale: false,
					},
					"Nutritional Analysis Summary": {
						state: "error",
						errorType: "enterpriseRestricted",
						value: "",
						isStale: false,
					},
				});

			return new CreatedHttpResponse("recipe.created");
		},
		makeResponseContract(CreatedHttpResponse, "recipe.created"),
	);
