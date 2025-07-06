/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Recipe } from "@business/entities/recipe";
import { mustBeConnectedRouteBuilder } from "@interfaces/http/security/mustBeConected";
import { airtableProvider } from "@interfaces/providers/airtable";
import { recipeRules } from "@vendors/entity-rules";

const {
	name, description, servings, calories, proteins, carbohydrates, fats, ingredients, intolerances,
} = recipeRules;

mustBeConnectedRouteBuilder()
	.createRoute("POST", "/recipe-create")
	.extract({
		body: zod.object({
			name: zod.string()
				.min(name.min)
				.max(name.max),
			description: zod.string()
				.min(description.min)
				.max(description.max),
			servings: zod.number()
				.int()
				.min(servings.min)
				.max(servings.max),
			calories: zod.number()
				.min(calories.min)
				.max(calories.max),
			proteins: zod.number()
				.min(proteins.min)
				.max(proteins.max),
			carbohydrates: zod.number()
				.min(carbohydrates.min)
				.max(carbohydrates.max),
			fats: zod.number()
				.min(fats.min)
				.max(fats.max),
			dishType: zod.enum(Recipe.dishTypeEnum.toTuple()),
			foodIntolerances: zod.enum(Recipe.intoleranceEnum.toTuple()).array()
				.max(intolerances.max),
			recipePhoto: zod.string().url(),
			ingredientIds: zod.string().array()
				.min(ingredients.min)
				.max(ingredients.max),
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
					name,
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
					"Recipe Name": name,
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
				});

			return new CreatedHttpResponse("recipe.created");
		},
		makeResponseContract(CreatedHttpResponse, "recipe.created"),
	);
