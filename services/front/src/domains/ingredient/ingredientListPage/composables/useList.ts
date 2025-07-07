import type { Ingredient } from "@vendors/clients-type/bff/duplojsTypesCodegen";
import { ingredientListPage } from "../router";

export function useList() {
	const router = useRouter();
	const { query } = ingredientListPage.use();

	const pageOfList = computed({
		get() {
			return query.value.page;
		},
		set(value) {
			void router.push(
				ingredientListPage.createTo({
					query: { page: value },
				}),
			);
		},
	});
	const list = ref<Ingredient[] | null>(null);

	watch(
		pageOfList,
		(page) => {
			void bffClient
				.post(
					"/ingredient-find-many",
					{ body: { page } },
				)
				.whenInformation(
					"ingredientList.found",
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
