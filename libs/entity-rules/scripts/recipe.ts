export const recipeRules = {
	name: {
		min: 1,
		max: 200,
	},
	description: {
		min: 10,
		max: 1000,
	},
	servings: {
		min: 1,
		max: 20,
	},
	calories: {
		min: 0,
		max: 5000,
	},
	proteins: {
		min: 0,
		max: 200,
	},
	carbohydrates: {
		min: 0,
		max: 500,
	},
	fats: {
		min: 0,
		max: 200,
	},
	intolerances: {
		max: 4,
	},
	ingredients: {
		min: 1,
		max: 20,
	},
};
