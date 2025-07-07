import { useCreateIngredientForm } from "./useCreateIngredientForm";

export function usePage() {
	const {
		CreateIngredientForm,
		check,
		reset,
	} = useCreateIngredientForm();

	function onSubmit() {
		const result = check();

		if (!result) {
			return;
		}

		void bffClient
			.post(
				"/ingredient-create",
				{
					body: {
						...result,
						vitaminList: result.vitaminList.map((vitamin) => vitamin.value),
						mineralList: result.mineralList.map((mineral) => mineral.value),
					},
				},
			)
			.whenInformation(
				"ingredient.created",
				reset,
			);
	}

	return {
		CreateIngredientForm,
		onSubmit,
	};
}
