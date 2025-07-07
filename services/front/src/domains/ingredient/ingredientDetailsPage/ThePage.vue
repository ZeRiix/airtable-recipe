<script setup lang="ts">
import { usePage } from "./composables/usePage";
import { ingredientDetailsPage } from "./router";

const { $pt } = ingredientDetailsPage.use();
const { pageContent } = usePage();

</script>

<template>
	<section class="space-y-6">
		<div
			v-if="pageContent.ingredient.value"
			class="max-w-4xl mx-auto"
		>
			<BackButton />

			<h1 class="text-3xl font-bold my-6">
				{{ pageContent.ingredient.value['Ingredient Name'] }}
			</h1>

			<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div class="space-y-6">
					<DSCard>
						<DSCardContent class="p-6">
							<div class="aspect-square rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
								<DSImage
									v-if="pageContent.ingredient.value['Ingredient Photo']"
									:src="pageContent.ingredient.value['Ingredient Photo']"
									:alt="pageContent.ingredient.value['Ingredient Name']"
									class="w-full h-full object-cover"
								/>

								<div
									v-else
									class="text-gray-400 text-center"
								>
									<ImageIcon class="w-16 h-16 mx-auto mb-2" />

									<p>{{ $pt('noImage') }}</p>
								</div>
							</div>
						</DSCardContent>
					</DSCard>

					<DSCard>
						<DSCardHeader>
							<DSCardTitle>{{ $pt('recipeStats.title') }}</DSCardTitle>
						</DSCardHeader>

						<DSCardContent>
							<div class="space-y-4">
								<div class="flex justify-between items-center">
									<span class="text-sm text-muted-foreground">{{ $pt('recipeStats.totalRecipes') }}</span>

									<span class="font-semibold">{{ pageContent.ingredient.value['Number of Recipes Using Ingredient'] }}</span>
								</div>

								<DSSeparator />

								<div class="space-y-2">
									<div class="flex justify-between items-center">
										<span class="text-sm text-muted-foreground">{{ $pt('recipeStats.avgCalories') }}</span>

										<span class="font-medium">{{ Math.round(pageContent.ingredient.value['Average Calories per Recipe']) }} kcal</span>
									</div>

									<div class="flex justify-between items-center">
										<span class="text-sm text-muted-foreground">{{ $pt('recipeStats.avgProteins') }}</span>

										<span class="font-medium">{{ Math.round(pageContent.ingredient.value['Average Proteins per Recipe']) }}g</span>
									</div>

									<div class="flex justify-between items-center">
										<span class="text-sm text-muted-foreground">{{ $pt('recipeStats.avgCarbs') }}</span>

										<span class="font-medium">{{ Math.round(pageContent.ingredient.value['Average Carbohydrates per Recipe']) }}g</span>
									</div>

									<div class="flex justify-between items-center">
										<span class="text-sm text-muted-foreground">{{ $pt('recipeStats.avgFats') }}</span>

										<span class="font-medium">{{ Math.round(pageContent.ingredient.value['Average Fats per Recipe']) }}g</span>
									</div>
								</div>
							</div>
						</DSCardContent>
					</DSCard>
				</div>

				<div class="space-y-6">
					<DSCard>
						<DSCardHeader>
							<DSCardTitle>{{ $pt('nutritional.title') }}</DSCardTitle>

							<DSCardDescription>{{ $pt('nutritional.description') }}</DSCardDescription>
						</DSCardHeader>

						<DSCardContent>
							<div class="grid grid-cols-2 gap-4">
								<div class="text-center p-4 bg-blue-50 rounded-lg">
									<div class="text-2xl font-bold text-blue-600">
										{{ pageContent.ingredient.value.Calories }}
									</div>

									<div class="text-sm text-blue-600/80">
										{{ $pt('nutritional.calories') }}
									</div>
								</div>

								<div class="text-center p-4 bg-green-50 rounded-lg">
									<div class="text-2xl font-bold text-green-600">
										{{ pageContent.ingredient.value.Proteins }}g
									</div>

									<div class="text-sm text-green-600/80">
										{{ $pt('nutritional.proteins') }}
									</div>
								</div>

								<div class="text-center p-4 bg-yellow-50 rounded-lg">
									<div class="text-2xl font-bold text-yellow-600">
										{{ pageContent.ingredient.value.Carbohydrates }}g
									</div>

									<div class="text-sm text-yellow-600/80">
										{{ $pt('nutritional.carbohydrates') }}
									</div>
								</div>

								<div class="text-center p-4 bg-orange-50 rounded-lg">
									<div class="text-2xl font-bold text-orange-600">
										{{ pageContent.ingredient.value.Fats }}g
									</div>

									<div class="text-sm text-orange-600/80">
										{{ $pt('nutritional.fats') }}
									</div>
								</div>
							</div>
						</DSCardContent>
					</DSCard>

					<div
						v-if="pageContent.ingredient.value.Vitamins || pageContent.ingredient.value.Minerals"
						class="space-y-4"
					>
						<DSCard v-if="pageContent.ingredient.value.Vitamins">
							<DSCardHeader>
								<DSCardTitle class="text-lg">
									{{ $pt('vitamins.title') }}
								</DSCardTitle>
							</DSCardHeader>

							<DSCardContent>
								<p class="text-sm text-muted-foreground">
									{{ pageContent.ingredient.value.Vitamins }}
								</p>
							</DSCardContent>
						</DSCard>

						<DSCard v-if="pageContent.ingredient.value.Minerals">
							<DSCardHeader>
								<DSCardTitle class="text-lg">
									{{ $pt('minerals.title') }}
								</DSCardTitle>
							</DSCardHeader>

							<DSCardContent>
								<p class="text-sm text-muted-foreground">
									{{ pageContent.ingredient.value.Minerals }}
								</p>
							</DSCardContent>
						</DSCard>
					</div>

					<DSCard v-if="pageContent.ingredient.value['Nutritional Content']">
						<DSCardHeader>
							<DSCardTitle class="text-lg">
								{{ $pt('nutritionalContent.title') }}
							</DSCardTitle>
						</DSCardHeader>

						<DSCardContent>
							<p class="text-sm text-muted-foreground leading-relaxed">
								{{ pageContent.ingredient.value['Nutritional Content'] }}
							</p>
						</DSCardContent>
					</DSCard>

					<DSCard>
						<DSCardHeader>
							<DSCardTitle class="text-lg">
								{{ $pt('totalRecipeNutritional.title') }}
							</DSCardTitle>

							<DSCardDescription>{{ $pt('totalRecipeNutritional.description') }}</DSCardDescription>
						</DSCardHeader>

						<DSCardContent>
							<div class="space-y-3">
								<div class="flex justify-between items-center">
									<span class="text-sm text-muted-foreground">{{ $pt('nutritional.calories') }}</span>

									<span class="font-medium">{{ pageContent.ingredient.value['Total Calories in Recipes'].toLocaleString() }} kcal</span>
								</div>

								<div class="flex justify-between items-center">
									<span class="text-sm text-muted-foreground">{{ $pt('nutritional.proteins') }}</span>

									<span class="font-medium">{{ pageContent.ingredient.value['Total Proteins in Recipes'].toLocaleString() }}g</span>
								</div>

								<div class="flex justify-between items-center">
									<span class="text-sm text-muted-foreground">{{ $pt('nutritional.carbohydrates') }}</span>

									<span class="font-medium">{{ pageContent.ingredient.value['Total Carbohydrates in Recipes'].toLocaleString() }}g</span>
								</div>

								<div class="flex justify-between items-center">
									<span class="text-sm text-muted-foreground">{{ $pt('nutritional.fats') }}</span>

									<span class="font-medium">{{ pageContent.ingredient.value['Total Fats in Recipes'].toLocaleString() }}g</span>
								</div>
							</div>
						</DSCardContent>
					</DSCard>
				</div>
			</div>
		</div>
	</section>
</template>
