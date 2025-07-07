export const loginPage = createPage(
	"login",
	{
		path: "/login",
		component: () => import("./ThePage.vue"),
	},
);
