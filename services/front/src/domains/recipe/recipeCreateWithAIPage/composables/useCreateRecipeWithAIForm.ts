import { recipeRules } from "@vendors/entity-rules";
import { recipeCreateWithAIPage } from "../router";

const numberOfPeopleMin = 1;

export function useCreateRecipeWithAIForm() {
	const { $pt } = recipeCreateWithAIPage.use();
	const { t } = useI18n();

	const { check, Form, reset } = useFormBuilder(
		useMultiFieldLayout({
			name: useCheckLayout(
				textFormField,
				{
					mandatory: true,
					label: $pt("form.label.name"),
					schema: zod.string()
						.min(
							recipeRules.name.min,
							{ message: t("formMessage.minLength", { value: recipeRules.name.min }) },
						)
						.max(
							recipeRules.fats.max,
							{ message: t("formMessage.maxLength", { value: recipeRules.name.max }) },
						),
				},
			),
			numberOfPeople: useCheckLayout(
				numberFormFiels,
				{
					mandatory: true,
					label: $pt("form.label.numberOfPeople"),
					schema: zod.number()
						.min(
							numberOfPeopleMin,
							{ message: t("formMessage.minLength", { value: numberOfPeopleMin }) },
						),
				},
			),
			recipePhoto: useCheckLayout(
				textFormField,
				{
					mandatory: true,
					label: $pt("form.label.recipePhoto"),
					schema: zod.string().url(),
				},
			),

		}),
	);

	return {
		check,
		reset,
		CreateRecipeWithAIForm: Form,
	};
}
