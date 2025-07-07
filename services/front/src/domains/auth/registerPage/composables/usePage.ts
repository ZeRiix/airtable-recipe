import { loginPage } from "../../loginPage/router";
import { useRegisterForm } from "./useRegisterForm";

export function usePage() {
	const router = useRouter();

	const {
		RegisterForm,
		check,
	} = useRegisterForm();

	function onSubmit() {
		const result = check();

		if (!result) {
			return;
		}

		return bffClient.post(
			"/register",
			{
				body: result,
			},
		)
			.whenInformation(
				"user.register",
				() => router.push(
					loginPage.createTo(),
				),
			);
	}

	return {
		onSubmit,
		RegisterForm,
	};
}
