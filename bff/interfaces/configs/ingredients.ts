export const ingredientConfigs = {
	findMany: {
		quantityPerPage: 10,
		pageOffset: 1,
	},
	create: {
		name: {
			min: 1,
			max: 100,
		},
		nutritionalContent: {
			min: 10,
			max: 500,
		},
		calories: {
			min: 0,
			max: 1000,
		},
		proteins: {
			min: 0,
			max: 100,
		},
		carbohydrates: {
			min: 0,
			max: 100,
		},
		fats: {
			min: 0,
			max: 100,
		},
		vitamins: {
			max: 10,
		},
		minerals: {
			max: 10,
		},
	},
};
