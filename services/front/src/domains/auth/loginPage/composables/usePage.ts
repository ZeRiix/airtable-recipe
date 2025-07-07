import { homePage } from "@/domains/edito/homePage/router";
import { useLoginForm } from "./useLoginForm";
import { useUserInformation } from "@/domains/user/composables/useUserInformation";

export function usePage() {
	const router = useRouter();

	const {
		LoginForm,
		check,
	} = useLoginForm();
	const { fetchInformation } = useUserInformation();

	function onSubmit() {
		const result = check();

		if (!result) {
			return;
		}

		return bffClient.post(
			"/login",
			{
				body: result,
			},
		)
			.whenInformation(
				"user.login",
				() => {
					void fetchInformation();
					void router.push(
						homePage.createTo(),
					);
				},
			);
	}

	return {
		LoginForm,
		onSubmit,
	};
}
