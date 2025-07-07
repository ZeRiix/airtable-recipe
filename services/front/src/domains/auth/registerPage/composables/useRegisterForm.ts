import { registerPage } from "../router";
import { userRules } from "@vendors/entity-rules";

export function useRegisterForm() {
	const { $pt } = registerPage.use();
	const { t } = useI18n();

	const { Form, check } = useFormBuilder(
		useMultiFieldLayout({
			username: useCheckLayout(
				textFormField,
				{
					mandatory: true,
					label: $pt("form.label.username"),
					schema: zod.string()
						.min(
							userRules.username.min,
							{ message: t("formMessage.minLength", { value: userRules.username.min }) },
						)
						.max(
							userRules.username.max,
							{ message: t("formMessage.maxLength", { value: userRules.username.max }) },
						),
				},
			),
			email: useCheckLayout(
				textFormField,
				{
					mandatory: true,
					label: $pt("form.label.email"),
					schema: zod.string().email(),
				},
			),
			password: useCheckLayout(
				textFormField,
				{
					mandatory: true,
					label: $pt("form.label.password"),
					schema: zod.string()
						.min(
							userRules.password.min,
							{ message: t("formMessage.minLength", { value: userRules.password.min }) },
						)
						.max(
							userRules.password.max,
							{ message: t("formMessage.maxLength", { value: userRules.password.max }) },
						),
				},
			),
		}),
	);

	return {
		RegisterForm: Form,
		check,
	};
}
