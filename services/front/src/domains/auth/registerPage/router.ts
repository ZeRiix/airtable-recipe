export const registerPage = createPage(
	"register",
	{
		path: "/register",
		component: () => import("./ThePage.vue"),
	},
);
