export const recipeSchema = zod.object({
	id: zod.string(),
	test: zod.string(),
});

export type Recipe = Zod.infer<typeof recipeSchema>;
