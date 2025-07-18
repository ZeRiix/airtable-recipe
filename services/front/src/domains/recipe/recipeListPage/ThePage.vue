<script setup lang="ts">
import { recipeDetailsPage } from "../recipeDetailsPage/router";
import RecipeCard from "./components/RecipeCard.vue";
import { useList } from "./composables/useList";
import { usePage } from "./composables/usePage";
import { recipeListPage } from "./router";

const router = useRouter();
const { $pt } = recipeListPage.use();
const { pageContent } = usePage();
const { list, pageOfList } = useList();

const maxPage = 100;

function setPage(page: number) {
	pageOfList.value = page;
}

function handleClickRecipeCard(recipeId: string) {
	return router.push(
		recipeDetailsPage.createTo(
			{ params: { recipeId } },
		),
	);
}

</script>

<template>
	<section
		class="space-y-6"
		v-if="pageContent && list"
	>
		<BackButton />

		<header class="mb-8 ml-5">
			<h1 class="mb-2 text-3xl font-bold">
				{{ $pt("title") }}
			</h1>

			<p class="text-muted-foreground">
				{{ $pt("recipeCount", { count: pageContent.total }) }}
			</p>
		</header>

		<div class="mb-6 flex justify-center">
			<DSPagination
				:max-page="maxPage"
				:total="pageContent.total"
				:current-page="pageOfList"
				:quantity-per-page="pageContent.quantityPerPage"
				@update="setPage"
			/>
		</div>

		<div
			class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
		>
			<RecipeCard
				v-for="row in list"
				:key="row.id"
				:recipe="row"
				@click="handleClickRecipeCard(row.id)"
			/>
		</div>

		<div
			v-if="list.length === 0"
			class="px-4 py-16 text-center"
		>
			<div class="mb-4">
				<DSIcon
					name="foodDrumstick"
					class="mx-auto text-muted-foreground"
					size="large"
				/>
			</div>

			<h2 class="mb-2 text-xl font-semibold">
				{{ $pt("emptyTitle") }}
			</h2>

			<p class="text-muted-foreground">
				{{ $pt("emptyDescription") }}
			</p>
		</div>

		<div class="flex justify-center">
			<DSPagination
				:max-page="maxPage"
				:total="pageContent.total"
				:current-page="pageOfList"
				:quantity-per-page="pageContent.quantityPerPage"
				@update="setPage"
			/>
		</div>
	</section>
</template>
