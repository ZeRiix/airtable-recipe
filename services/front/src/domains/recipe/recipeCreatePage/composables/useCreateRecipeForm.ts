import { recipeCreatePage } from "../router";

export function useCreateRecipeForm() {
	const { $pt } = recipeCreatePage.use();
	const { Form, check, reset } = useFormBuilder(
		useMultiFieldLayout({

		}),
	);

	return {
		CreateRecipeForm: Form,
		check,
		reset,
	};
}
