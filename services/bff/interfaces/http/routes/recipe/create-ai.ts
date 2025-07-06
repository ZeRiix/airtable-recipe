import { Recipe } from "@business/entities/recipe";
import { recipeConfigs } from "@interfaces/configs/recipe";
import { RecipeAi } from "@interfaces/http/schemas/recipe";
import { mustBeConnectedRouteBuilder } from "@interfaces/http/security/mustBeConected";
import { airtableProvider } from "@interfaces/providers/airtable";
import { OllamaProvider } from "@interfaces/providers/ollama";
import { ingredientPrompt } from "@interfaces/providers/ollama/prompts/ingredient";
import { recipePrompt } from "@interfaces/providers/ollama/prompts/recipe";
import { recipeRules } from "@vendors/entity-rules";

const { name } = recipeRules;
const { numberOfPeople } = recipeConfigs.createAi;

mustBeConnectedRouteBuilder()
	.createRoute("POST", "/recipe-create-with-ai")
	.extract({
		body: zod.object({
			name: zod.string()
				.min(name.min)
				.max(name.max),
			numberOfPeople: zod.number()
				.min(numberOfPeople.min)
				.max(numberOfPeople.max),
			recipePhoto: zod.string().url(),
		}),
	})
	.cut(
		async({ pickup, dropper }) => {
			const { name, numberOfPeople } = pickup("body");

			const result = await OllamaProvider
				.sendMessage([
					{
						role: "user",
						content: recipePrompt(name, numberOfPeople),
					},
				])
				.then(
					(value) => JSON.parse(
						value.body.message.content,
					),
				);

			const simpleRecipe = RecipeAi.simpleRecipe.parse(result);

			return dropper({ simpleRecipe: simpleRecipe });
		},
		["simpleRecipe"],
	)
	.cut(
		async({ pickup, dropper }) => {
			const { simpleRecipe } = pickup(["simpleRecipe"]);

			const result = await Promise.all(
				simpleRecipe.ingredientList.map(
					(ingredient) => OllamaProvider
						.sendMessage(
							[
								{
									role: "user",
									content: ingredientPrompt(ingredient),
								},
							],
						).then(
							(value) => JSON.parse(
								value.body.message.content,
							),
						),
				),
			);

			const simpleIngredientList = RecipeAi.simpleIngredientList.parse(result);

			return dropper({ simpleIngredientList });
		},
		["simpleIngredientList"],
	)
	.cut(
		async({ pickup, dropper }) => {
			const { simpleIngredientList } = pickup(["simpleIngredientList"]);

			const result = await airtableProvider.ingredientEntity
				.createMany(
					simpleIngredientList.map(
						(simpleIngredient) => ({
							"Ingredient Name": simpleIngredient.ingredientName,
							"Nutritional Content": simpleIngredient.nutritionalContent,
							Calories: simpleIngredient.calories,
							Carbohydrates: simpleIngredient.carbohydrates,
							Fats: simpleIngredient.fats,
							Proteins: simpleIngredient.proteins,
							Minerals: simpleIngredient.minerals.toString(),
							Vitamins: simpleIngredient.vitamins.toString(),
							"Ingredient Photo": "https://example.com/ingredient.jpg",
						}),
					),
				)
				.then(
					({ body }) => body.records.map(
						(record) => ({
							...record.fields,
							id: record.id,
						}),
					),
				);

			return dropper({ ingredientList: result });
		},
		["ingredientList"],
	)
	.cut(
		async({ pickup, dropper }) => {
			const { simpleRecipe, ingredientList, body: { recipePhoto } } = pickup(["simpleRecipe", "ingredientList", "body"]);

			const result = await airtableProvider.recipeEntity
				.create({
					"Recipe Name": simpleRecipe.recipeName,
					Description: simpleRecipe.description,
					Servings: simpleRecipe.servings,
					Calories: simpleRecipe.calories,
					Proteins: simpleRecipe.proteins,
					Carbohydrates: simpleRecipe.carbohydrates,
					Fats: simpleRecipe.fats,
					// flemme de faire un filter
					Vitamins: ingredientList.map((ingredient) => ingredient.Vitamins).toString(),
					Minerals: ingredientList.map((ingredient) => ingredient.Minerals).toString(),
					"Dish Type": simpleRecipe.dishType,
					"Food Intolerances": simpleRecipe.foodIntolerances,
					"Recipe Photo": recipePhoto,
					Ingredients: ingredientList.map((ingredient) => ingredient.id),
				})
				.then(
					({ body }) => body.records.map(
						(record) => ({
							...record.fields,
							id: record.id,
						}),
					),
				);

			// eslint-disable-next-line @typescript-eslint/no-magic-numbers
			return dropper({ recipe: result[0] });
		},
		["recipe"],
	)
	.handler(
		(pickup) => {
			const { recipe } = pickup(["recipe"]);

			return new CreatedHttpResponse("recipe.createdWithAI", recipe);
		},
		makeResponseContract(CreatedHttpResponse, "recipe.createdWithAI", Recipe.index),
	);
