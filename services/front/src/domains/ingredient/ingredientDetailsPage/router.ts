export const ingredientDetailsPage = createPage(
	"ingredientDetails",
	{
		path: "/ingredient-details/:ingredientId",
		component: () => import("./ThePage.vue"),
		params: {
			ingredientId: zod.string(),
		},
	},
);
