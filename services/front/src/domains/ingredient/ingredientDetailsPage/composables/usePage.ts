import { useGetIngredient } from "../../composables/useGetIngrdient";
import { ingredientDetailsPage } from "../router";

export function usePage() {
	const router = useRouter();
	const { params } = ingredientDetailsPage.use();

	const { ingredient } = useGetIngredient(
		params.value.ingredientId,
		() => void router.back(),
	);

	return {
		pageContent: {
			ingredient,
		},
	};
}
