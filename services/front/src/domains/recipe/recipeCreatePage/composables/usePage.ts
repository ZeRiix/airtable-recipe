import { useCreateRecipeForm } from "./useCreateRecipeForm";

export function usePage() {
	const {
		CreateRecipeForm,
		check,
		reset,
	} = useCreateRecipeForm();

	function onSubmit() {
		const result = check();

		if (!result) {
			return;
		}

		return bffClient
			.post(
				"/recipe-create",
				{
					body: result,
				},
			)
			.whenInformation(
				"recipe.created",
				reset,
			);
	}

	return {
		CreateRecipeForm,
		onSubmit,
	};
}
