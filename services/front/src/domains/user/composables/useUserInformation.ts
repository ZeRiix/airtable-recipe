import type { User } from "@/libs/bff/types";

const globalUser = ref<User | null>(null);
const globalIsConnected = ref(false);

export function useUserInformation(
	whenFindError?: () => void,
) {
	function disconect() {
		document.cookie = "token=; Max-Age=0; path=/; domain=localhost;";
		globalUser.value = null;
		globalIsConnected.value = false;
	}

	function fetchInformation() {
		return bffClient.get(
			"/me",
		)
			.whenInformation(
				"user.found",
				({ body }) => {
					globalUser.value = body;
					globalIsConnected.value = true;
				},
			)
			.whenRequestError(
				() => {
					void disconect();
					if (whenFindError) {
						whenFindError();
					}
				},
			);
	}

	if (!globalUser.value && !globalIsConnected.value) {
		void fetchInformation();
	}

	watch(
		globalUser,
		(newUser) => {
			globalIsConnected.value = !!newUser;
		},
	);

	return {
		user: globalUser,
		fetchInformation,
		isConnected: globalIsConnected,
		disconect,
	};
}
