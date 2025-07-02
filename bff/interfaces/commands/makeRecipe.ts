import { zod } from "@duplojs/core";
import { program } from "commander";
import "../envs";
import { OllamaProvider } from "@interfaces/providers/ollama";
import { recipePrompt } from "@interfaces/providers/ollama/prompts/recipe";
import { ingredientPrompt } from "@interfaces/providers/ollama/prompts/ingredient";

export const inputRecipeSchema = zod.object({
	"Recipe Name": zod.string(),
	Description: zod.string(),
	Servings: zod.number(),
	Calories: zod.number(),
	Proteins: zod.number(),
	Carbohydrates: zod.number(),
	Fats: zod.number(),
	Vitamins: zod.string(),
	Minerals: zod.string(),
	"Dish Type": zod.string(),
	"Food Intolerances": zod.array(zod.string()),
	Ingredients: zod.array(zod.string()),
	"Total Nutritional Content": zod.string(),
	"Total Ingredient Calories": zod.number(),
	"Total Ingredient Proteins": zod.number(),
	"Total Ingredient Carbohydrates": zod.number(),
	"Total Ingredient Fats": zod.number(),
	"Ingredient List": zod.array(zod.string()),
	"Recipe Summary": zod.object({
		state: zod.string(),
		errorType: zod.string().nullish().default(""),
		value: zod.string(),
		isStale: zod.boolean(),
	}),
	"Nutritional Analysis Summary": zod.object({
		state: zod.string(),
		errorType: zod.string().nullish().default(""),
		value: zod.string(),
		isStale: zod.boolean(),
	}),
});

const inputSchema = zod.object({
	name: zod.string(),
	numberOfPeople: zod.coerce.number(),
});

program
	.requiredOption("-n, --name <char>")
	.requiredOption("-p, --numberOfPeople <char>");

program.parse();

const rawInput = program.opts<Record<string, string>>();

const { name, numberOfPeople } = inputSchema.parse(rawInput);

const rawRecipe = await OllamaProvider.sendMessage([
	{
		role: "user",
		content: recipePrompt(name, numberOfPeople),
	},
]).then(
	(value) => JSON.parse(
		value.body.message.content,
	),
);

console.log(rawRecipe);

const recipe = inputRecipeSchema.parse(rawRecipe);

const { "Ingredient List": recipeIngredients } = recipe;

const rawIngredients = await Promise.all(
	recipeIngredients.map(
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

console.log(rawIngredients);
