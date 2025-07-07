const defaultPage = 1;

export const recipeListPage = createPage(
	"recipeList",
	{
		path: "/recipe-list",
		component: () => import("./ThePage.vue"),
		query: {
			page: zod.coerce.number().default(defaultPage),
		},
	},
);
