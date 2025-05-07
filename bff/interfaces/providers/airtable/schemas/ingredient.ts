export const thumbnailSchema = zod.object({
	url: zod.string().url(),
	width: zod.number().int().positive(),
	height: zod.number().int().positive(),
});

export const photoSchema = zod.object({
	id: zod.string(),
	width: zod.number().int().positive(),
	height: zod.number().int().positive(),
	url: zod.string().url(),
	filename: zod.string(),
	size: zod.number().int().positive(),
	type: zod.string(),
	thumbnails: zod.object({
		small: thumbnailSchema,
		large: thumbnailSchema,
		full: thumbnailSchema,
	}),
});

export const ingredientSchema = zod.object({
	id: zod.string(),
	"Ingredient Name": zod.string(),
	"Nutritional Content": zod.string(),
	Calories: zod.number(),
	Proteins: zod.number(),
	Carbohydrates: zod.number(),
	Fats: zod.number(),
	Vitamins: zod.string(),
	Minerals: zod.string(),
	"Ingredient Photo": photoSchema.array().optional(),
	"Related Recipes": zod.string().array(),
	"Total Calories in Recipes": zod.number(),
	"Total Proteins in Recipes": zod.number(),
	"Total Carbohydrates in Recipes": zod.number(),
	"Total Fats in Recipes": zod.number(),
	"Number of Recipes Using Ingredient": zod.number().int(),
	"Average Calories per Recipe": zod.number(),
	"Average Proteins per Recipe": zod.number(),
	"Average Carbohydrates per Recipe": zod.number(),
	"Average Fats per Recipe": zod.number(),
});

export type Ingredient = Zod.infer<typeof ingredientSchema>;
