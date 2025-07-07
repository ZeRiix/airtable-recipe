import { ingredientRules } from "@vendors/entity-rules";
import { ingredientCreatePage } from "../router";
import type { Mineral, Vitamin } from "@vendors/clients-type/bff/duplojsTypesCodegen";

interface MultiComboboxItemVitamin {
	label: string;
	value: Vitamin;
}

interface MultiComboboxItemMineral {
	label: string;
	value: Mineral;
}

const vitaminsData: MultiComboboxItemVitamin[] = [
	{
		label: "Vitamine A",
		value: "A",
	},
	{
		label: "Vitamine B1 (Thiamine)",
		value: "B1",
	},
	{
		label: "Vitamine B2 (Riboflavine)",
		value: "B2",
	},
	{
		label: "Vitamine B3 (Niacine)",
		value: "B3",
	},
	{
		label: "Vitamine B5 (Acide pantothénique)",
		value: "B5",
	},
	{
		label: "Vitamine B6 (Pyridoxine)",
		value: "B6",
	},
	{
		label: "Vitamine B7 (Biotine)",
		value: "B7",
	},
	{
		label: "Vitamine C",
		value: "C",
	},
	{
		label: "Vitamine D",
		value: "D",
	},
	{
		label: "Vitamine E",
		value: "E",
	},
	{
		label: "Vitamine K",
		value: "K",
	},
];

const mineralsData: MultiComboboxItemMineral[] = [
	{
		label: "Calcium",
		value: "Calcium",
	},
	{
		label: "Chlorure",
		value: "Chloride",
	},
	{
		label: "Cuivre",
		value: "Copper",
	},
	{
		label: "Fer",
		value: "Iron",
	},
	{
		label: "Magnésium",
		value: "Magnesium",
	},
	{
		label: "Manganèse",
		value: "Manganese",
	},
	{
		label: "Phosphore",
		value: "Phosphorus",
	},
	{
		label: "Potassium",
		value: "Potassium",
	},
	{
		label: "Sélénium",
		value: "Selenium",
	},
	{
		label: "Sodium",
		value: "Sodium",
	},
	{
		label: "Zinc",
		value: "Zinc",
	},
];

const vitaminFormValueSchema = zod.object({
	label: zod.string(),
	value: zod.enum(["A", "B1", "B2", "B3", "B5", "B6", "B7", "C", "D", "E", "K"]),
});

const mineralFormValueSchema = zod.object({
	label: zod.string(),
	value: zod.enum([
		"Calcium",
		"Chloride",
		"Copper",
		"Iron",
		"Magnesium",
		"Manganese",
		"Phosphorus",
		"Potassium",
		"Selenium",
		"Sodium",
		"Zinc",
	]),
});

export function useCreateIngredientForm() {
	const { $pt } = ingredientCreatePage.use();
	const { t } = useI18n();

	const { Form, check, reset, formValue } = useFormBuilder(
		useMultiFieldLayout(
			{
				name: useCheckLayout(
					textFormField,
					{
						mandatory: true,
						label: $pt("form.label.name"),
						schema: zod.string()
							.min(
								ingredientRules.name.min,
								{ message: t("formMessage.minLength", { value: ingredientRules.name.min }) },
							)
							.max(
								ingredientRules.name.max,
								{ message: t("formMessage.maxLength", { value: ingredientRules.name.max }) },
							),
					},
				),
				nutritionalContent: useCheckLayout(
					textareaFormField,
					{
						mandatory: true,
						label: $pt("form.label.nutritionalContent"),
						schema: zod.string()
							.min(
								ingredientRules.nutritionalContent.min,
								{ message: t("formMessage.minLength", { value: ingredientRules.nutritionalContent.min }) },
							)
							.max(
								ingredientRules.nutritionalContent.max,
								{ message: t("formMessage.maxLength", { value: ingredientRules.nutritionalContent.max }) },
							),
						template: checkLayoutTemplateGridCols({ hideUselessErrorBlock: true }),
					},
				),
				calories: useCheckLayout(
					numberFormFiels,
					{
						mandatory: true,
						label: $pt("form.label.calories"),
						schema: zod.number()
							.min(
								ingredientRules.calories.min,
								{ message: t("formMessage.minLength", { value: ingredientRules.calories.min }) },
							)
							.max(
								ingredientRules.calories.max,
								{ message: t("formMessage.maxLength", { value: ingredientRules.calories.max }) },
							),
					},
				),
				proteins: useCheckLayout(
					numberFormFiels,
					{
						mandatory: true,
						label: $pt("form.label.proteins"),
						schema: zod.number()
							.min(
								ingredientRules.proteins.min,
								{ message: t("formMessage.minLength", { value: ingredientRules.proteins.min }) },
							)
							.max(
								ingredientRules.proteins.max,
								{ message: t("formMessage.maxLength", { value: ingredientRules.proteins.max }) },
							),
					},
				),
				carbohydrates: useCheckLayout(
					numberFormFiels,
					{
						mandatory: true,
						label: $pt("form.label.carbohydrates"),
						schema: zod.number()
							.min(
								ingredientRules.carbohydrates.min,
								{ message: t("formMessage.minLength", { value: ingredientRules.carbohydrates.min }) },
							)
							.max(
								ingredientRules.carbohydrates.max,
								{ message: t("formMessage.maxLength", { value: ingredientRules.carbohydrates.max }) },
							),
					},
				),
				fats: useCheckLayout(
					numberFormFiels,
					{
						mandatory: true,
						label: $pt("form.label.fats"),
						schema: zod.number()
							.min(
								ingredientRules.fats.min,
								{ message: t("formMessage.minLength", { value: ingredientRules.fats.min }) },
							)
							.max(
								ingredientRules.fats.max,
								{ message: t("formMessage.maxLength", { value: ingredientRules.fats.max }) },
							),
					},
				),
				vitaminList: useCheckLayout(
					multiComboBoxFormField,
					{
						mandatory: true,
						label: $pt("form.label.vitamins"),
						schema: vitaminFormValueSchema
							.array()
							.max(
								ingredientRules.vitamins.max,
								{ message: t("formMessage.maxLength", { value: ingredientRules.vitamins.max }) },
							),
						props: {
							placeholder: "",
							emptyLabel: "",
							items: vitaminsData,
						},
					},
				),
				mineralList: useCheckLayout(
					multiComboBoxFormField,
					{
						mandatory: true,
						label: $pt("form.label.vitamins"),
						schema: mineralFormValueSchema
							.array()
							.max(
								ingredientRules.minerals.max,
								{ message: t("formMessage.maxLength", { value: ingredientRules.minerals.max }) },
							),
						props: {
							placeholder: "",
							emptyLabel: "",
							items: mineralsData,
						},
					},
				),
				photoLink: useCheckLayout(
					textFormField,
					{
						label: $pt("form.label.photoLink"),
						mandatory: true,
						schema: zod.string().url(),
					},
				),
			},
		),
	);

	return {
		CreateIngredientForm: Form,
		check,
		reset,
		formValue,
	};
}
