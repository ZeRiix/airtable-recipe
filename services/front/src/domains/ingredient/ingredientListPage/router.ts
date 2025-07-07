const defaultPage = 1;

export const ingredientListPage = createPage(
	"ingredientList",
	{
		path: "/ingredient-list",
		component: () => import("./ThePage.vue"),
		query: {
			page: zod.coerce.number().default(defaultPage),
		},
	},
);
