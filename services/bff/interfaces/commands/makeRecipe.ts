import { zod } from "@duplojs/core";
import { program } from "commander";
import "../envs";
import { OllamaProvider } from "@interfaces/providers/ollama";
import { recipePrompt } from "@interfaces/providers/ollama/prompts/recipe";
import { ingredientPrompt } from "@interfaces/providers/ollama/prompts/ingredient";
import { Recipe } from "@business/entities/recipe";

export const inputRecipeSchema = zod.object({
	recipeName: zod.string(),
	description: zod.string(),
	servings: zod.number(),
	calories: zod.number(),
	proteins: zod.number(),
	carbohydrates: zod.number(),
	fats: zod.number(),
	vitamins: zod.string(),
	minerals: zod.string(),
	dishType: zod.enum(Recipe.dishTypeEnum.toTuple()),
	foodIntolerances: zod.enum(Recipe.intoleranceEnum.toTuple()).array(),
	ingredientList: zod.array(zod.string()),
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

const { ingredientList: recipeIngredients } = recipe;

const rawIngredientList = await Promise.all(
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

console.log(rawIngredientList);
