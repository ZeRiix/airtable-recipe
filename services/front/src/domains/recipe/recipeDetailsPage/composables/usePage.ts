import { useGetRecipe } from "../../composables/useGetRecipe";
import { recipeDetailsPage } from "../router";

export function usePage() {
	const router = useRouter();
	const { params } = recipeDetailsPage.use();

	const { recipe } = useGetRecipe(
		params.value.recipeId,
		() => void router.back(),
	);

	return {
		pageContent: {
			recipe,
		},
	};
}
