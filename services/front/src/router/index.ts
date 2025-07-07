import { loginPage } from "@/domains/auth/loginPage/router";
import { registerPage } from "@/domains/auth/registerPage/router";
import { homePage } from "@/domains/edito/homePage/router";
import { notFoundPage } from "@/domains/edito/notFoundPage/router";
import { ingredientCreatePage } from "@/domains/ingredient/ingredientCreatePage/router";
import { ingredientDetailsPage } from "@/domains/ingredient/ingredientDetailsPage/router";
import { ingredientListPage } from "@/domains/ingredient/ingredientListPage/router";
import { recipeCreatePage } from "@/domains/recipe/recipeCreatePage/router";
import { recipeCreateWithAIPage } from "@/domains/recipe/recipeCreateWithAIPage/router";
import { recipeDetailsPage } from "@/domains/recipe/recipeDetailsPage/router";
import { recipeListPage } from "@/domains/recipe/recipeListPage/router";
import { profilPage } from "@/domains/user/profilPage/router";
import { createWebHistory, createRouter } from "vue-router";

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			component: () => import("../layouts/BaseLayout.vue"),
			children: [
				homePage.recordRaw,
				notFoundPage.recordRaw,
				ingredientListPage.recordRaw,
				ingredientDetailsPage.recordRaw,
				recipeDetailsPage.recordRaw,
				recipeListPage.recordRaw,
				ingredientCreatePage.recordRaw,
				recipeCreateWithAIPage.recordRaw,
				loginPage.recordRaw,
				registerPage.recordRaw,
				profilPage.recordRaw,
				recipeCreatePage.recordRaw,
			],
		},
	],
	scrollBehavior(_to, _from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return { top: 0 };
		}
	},
});

const { enableLoader, disableLoader } = useLoader();

router.beforeEach((_to, _from, next) => {
	enableLoader("routerLoadPage");
	next();
});

router.afterEach(() => {
	disableLoader("routerLoadPage");
});
