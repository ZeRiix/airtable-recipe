import { zod } from "@duplojs/core";
import { createEnum } from "@utils/enum";

export namespace Recipe {
	export const intoleranceEnum = createEnum([
		"Soy",
		"Gluten",
		"Lactose",
		"Nuts",
		"Seafood",
	]);

	export const dishTypeEnum = createEnum([
		"Main Course",
		"Dessert",
		"Appetizer",
		"Snack",
	]);

	export const index = zod.object({
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
		"Dish Type": zod.enum(dishTypeEnum.toTuple()),
		"Food Intolerances": zod.enum(intoleranceEnum.toTuple()).array(),
		Ingredients: zod.string().array(),
		"Recipe Photo": zod.string().url().optional(),
		"Total Nutritional Content": zod.string(),
		"Total Ingredient Calories": zod.number(),
		"Total Ingredient Proteins": zod.number(),
		"Total Ingredient Carbohydrates": zod.number(),
		"Total Ingredient Fats": zod.number(),
		"Ingredient List": zod.string().array(),
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

	export type Index = Zod.infer<typeof index>;

	export const list = index.array();

	export const listPage = zod.object({
		quantityPerPage: zod.number(),
		total: zod.number(),
	});
}

