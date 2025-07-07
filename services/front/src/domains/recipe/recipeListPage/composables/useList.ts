import type { Recipe } from "@vendors/clients-type/bff/duplojsTypesCodegen";
import { recipeListPage } from "../router";

export function useList() {
	const router = useRouter();
	const { query } = recipeListPage.use();

	const pageOfList = computed({
		get() {
			return query.value.page;
		},
		set(value) {
			void router.push(
				recipeListPage.createTo({
					query: { page: value },
				}),
			);
		},
	});
	const list = ref<Recipe[] | null>(null);

	watch(
		pageOfList,
		(page) => {
			void bffClient
				.post(
					"/recipe-find-many",
					{ body: { page } },
				)
				.whenInformation(
					"recipeList.found",
					(({ body }) => {
						list.value = body;
					}),
				);
		},
		{ immediate: true },
	);

	return {
		pageOfList,
		list,
	};
}
