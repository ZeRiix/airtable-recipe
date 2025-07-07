export const recipeDetailsPage = createPage(
	"recipeDetails",
	{
		path: "/recipe-details/:recipeId",
		component: () => import("./ThePage.vue"),
		params: {
			recipeId: zod.string(),
		},
	},
);
