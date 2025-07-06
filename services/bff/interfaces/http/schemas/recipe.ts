import { mineralEnumSchema } from "@business/entities/common/mineral";
import { vitaminEnumSchema } from "@business/entities/common/vitamin";
import { Recipe } from "@business/entities/recipe";
import { ZodAccelerator } from "@duplojs/core";

export namespace RecipeAi {
	export const simpleRecipe = ZodAccelerator.build(
		zod.object({
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
			ingredientList: zod.string().array(),
		}),
	);

	const simpleIngredient = zod.object({
		ingredientName: zod.string(),
		nutritionalContent: zod.string(),
		calories: zod.number(),
		proteins: zod.number(),
		carbohydrates: zod.number(),
		fats: zod.number(),
		vitamins: vitaminEnumSchema.array(),
		minerals: mineralEnumSchema.array(),
	});

	export const simpleIngredientList = ZodAccelerator.build(
		simpleIngredient.array(),
	);
}
