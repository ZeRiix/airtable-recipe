import { zod } from "@duplojs/core";
import { photoSchema } from "./photo";

export const recipeSchema = zod.object({
	id: zod.string(),
	createdAt: zod.string(),
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
	"Recipe Photo": photoSchema.array().optional(),
	"Total Nutritional Content": zod.string(),
	"Total Ingredient Calories": zod.number(),
	"Total Ingredient Proteins": zod.number(),
	"Total Ingredient Carbohydrates": zod.number(),
	"Total Ingredient Fats": zod.number(),
	"Ingredient List": zod.array(zod.string()),
	"Recipe Summary": zod.object({
		state: zod.string(),
		errorType: zod.string(),
		value: zod.string(),
		isStale: zod.boolean(),
	}),
	"Nutritional Analysis Summary": zod.object({
		state: zod.string(),
		errorType: zod.string(),
		value: zod.string(),
		isStale: zod.boolean(),
	}),
});

export type Recipe = Zod.infer<typeof recipeSchema>;
