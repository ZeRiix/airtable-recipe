import type { ResponseOfCreateRecipeWithAI } from "@/libs/bff/types";
import { useCreateRecipeWithAIForm } from "./useCreateRecipeWithAIForm";

export function usePage() {
	const result = ref<ResponseOfCreateRecipeWithAI | null>(null);

	const {
		CreateRecipeWithAIForm,
		check,
		reset,
	} = useCreateRecipeWithAIForm();

	function onSubmit() {
		const resultCheck = check();

		if (!resultCheck) {
			return;
		}

		void bffClient
			.post(
				"/recipe-create-with-ai",
				{
					body: resultCheck,
				},
			)
			.whenInformation(
				"recipe.createdWithAI",
				({ body }) => {
					result.value = body;
					reset();
				},
			);
	}

	function reCreate() {
		result.value = null;
	}

	return {
		CreateRecipeWithAIForm,
		onSubmit,
		result,
		reCreate,
	};
}
