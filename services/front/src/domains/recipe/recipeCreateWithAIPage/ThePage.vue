<script setup lang="ts">
import { usePage } from "./composables/usePage";
import { recipeCreateWithAIPage } from "./router";

const { $pt } = recipeCreateWithAIPage.use();
const { CreateRecipeWithAIForm, onSubmit, result, reCreate } = usePage();

function handleClickReCreate() {
	return void reCreate();
}

</script>

<template>
	<section class="space-y-6">
		<BackButton />

		<div class="space-y-2">
			<h1 class="text-3xl font-bold">
				{{ $pt("title") }}
			</h1>

			<p class="text-muted-foreground">
				{{ $pt("description") }}
			</p>
		</div>

		<div v-if="!result">
			<CreateRecipeWithAIForm
				@submit="onSubmit"
			>
				<DSPrimaryButton
					type="submit"
				>
					{{ $t("cta.add") }}
				</DSPrimaryButton>
			</CreateRecipeWithAIForm>
		</div>

		<div
			v-else
			class="space-y-6"
		>
			<DSCard>
				<DSCardHeader>
					<DSCardTitle>
						{{ $pt("result.title") }}
					</DSCardTitle>

					<DSCardDescription>
						{{ $pt("result.description") }}
					</DSCardDescription>
				</DSCardHeader>

				<DSCardContent>
					<div class="space-y-4">
						<div
							v-if="result['Recipe Name']"
							class="space-y-2"
						>
							<h3 class="font-semibold">
								{{ $pt("result.recipeName") }}
							</h3>

							<p>
								{{ result["Recipe Name"] }}
							</p>
						</div>

						<div
							v-if="result.Description"
							class="space-y-2"
						>
							<h3 class="font-semibold">
								{{ $pt("result.recipeDescription") }}
							</h3>

							<p>
								{{ result.Description }}
							</p>
						</div>

						<div
							v-if="result['Ingredient List'] && result['Ingredient List'].length > 0"
							class="space-y-2"
						>
							<h3 class="font-semibold">
								{{ $pt("result.ingredients") }}
							</h3>

							<ul class="list-disc list-inside space-y-1">
								<li
									v-for="ingredient in result['Ingredient List']"
									:key="ingredient"
								>
									{{ ingredient }}
								</li>
							</ul>
						</div>

						<div
							v-if="result.Servings"
							class="space-y-2"
						>
							<h3 class="font-semibold">
								{{ $pt("result.servings") }}
							</h3>

							<p>
								{{ result.Servings }} {{ $pt("result.servingsUnit") }}
							</p>
						</div>

						<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
							<div class="space-y-1">
								<h4 class="font-medium text-sm">
									{{ $pt("result.calories") }}
								</h4>

								<p class="text-sm text-muted-foreground">
									{{ result.Calories }} kcal
								</p>
							</div>

							<div class="space-y-1">
								<h4 class="font-medium text-sm">
									{{ $pt("result.proteins") }}
								</h4>

								<p class="text-sm text-muted-foreground">
									{{ result.Proteins }}g
								</p>
							</div>

							<div class="space-y-1">
								<h4 class="font-medium text-sm">
									{{ $pt("result.carbohydrates") }}
								</h4>

								<p class="text-sm text-muted-foreground">
									{{ result.Carbohydrates }}g
								</p>
							</div>

							<div class="space-y-1">
								<h4 class="font-medium text-sm">
									{{ $pt("result.fats") }}
								</h4>

								<p class="text-sm text-muted-foreground">
									{{ result.Fats }}g
								</p>
							</div>
						</div>
					</div>
				</DSCardContent>

				<DSCardFooter>
					<DSPrimaryButton
						@click="handleClickReCreate"
						icon="plus"
					>
						{{ $pt("result.createAnother") }}
					</DSPrimaryButton>
				</DSCardFooter>
			</DSCard>
		</div>
	</section>
</template>
