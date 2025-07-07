import { userRules } from "@vendors/entity-rules";
import { loginPage } from "../router";
import { passwordLayoutTemplate } from "@vendors/design-system/utils/layoutTemplate";

export function useLoginForm() {
	const { $pt } = loginPage.use();
	const { t } = useI18n();

	const { Form, check } = useFormBuilder(
		useMultiFieldLayout({
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
		LoginForm: Form,
		check,
	};
}
