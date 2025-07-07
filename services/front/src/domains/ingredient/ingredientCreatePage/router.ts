export const ingredientCreatePage = createPage(
	"ingredientCreate",
	{
		path: "/ingredient-create",
		component: () => import("./ThePage.vue"),
	},
);
