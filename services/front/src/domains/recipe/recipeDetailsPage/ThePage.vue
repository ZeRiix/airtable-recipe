<script setup lang="ts">
import { usePage } from "./composables/usePage";
import { recipeDetailsPage } from "./router";

const { $pt } = recipeDetailsPage.use();
const { pageContent } = usePage();

</script>

<template>
	<section class="space-y-6">
		<div
			v-if="pageContent.recipe.value"
			class="max-w-4xl mx-auto"
		>
			<BackButton />

			<h1 class="text-3xl font-bold my-6">
				{{ pageContent.recipe.value['Recipe Name'] }}
			</h1>

			<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div class="space-y-6">
					<DSCard>
						<DSCardContent class="p-6">
							<div class="aspect-video rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
								<DSImage
									v-if="pageContent.recipe.value['Recipe Photo']"
									:src="pageContent.recipe.value['Recipe Photo']"
									:alt="pageContent.recipe.value['Recipe Name']"
									class="w-full h-full object-cover"
								/>

								<div
									v-else
									class="text-gray-400 text-center"
								>
									<DSIcon
										name="imageAlbum"
										class="w-16 h-16 mx-auto mb-2"
									/>

									<p>{{ $pt('noImage') }}</p>
								</div>
							</div>
						</DSCardContent>
					</DSCard>

					<DSCard>
						<DSCardHeader>
							<DSCardTitle>{{ $pt('basicInfo.title') }}</DSCardTitle>
						</DSCardHeader>

						<DSCardContent>
							<div class="space-y-4">
								<div class="flex justify-between items-center">
									<span class="text-sm text-muted-foreground">{{ $pt('basicInfo.dishType') }}</span>

									<DSBadge variant="secondary">
										{{ pageContent.recipe.value['Dish Type'] }}
									</DSBadge>
								</div>

								<div class="flex justify-between items-center">
									<span class="text-sm text-muted-foreground">{{ $pt('basicInfo.servings') }}</span>

									<span class="font-semibold">{{ pageContent.recipe.value.Servings }}</span>
								</div>

								<DSSeparator />

								<div class="flex justify-between items-center">
									<span class="text-sm text-muted-foreground">{{ $pt('basicInfo.totalIngredients') }}</span>

									<span class="font-medium">{{ pageContent.recipe.value.Ingredients.length }}</span>
								</div>
							</div>
						</DSCardContent>
					</DSCard>

					<DSCard v-if="pageContent.recipe.value['Food Intolerances']?.length">
						<DSCardHeader>
							<DSCardTitle>{{ $pt('intolerances.title') }}</DSCardTitle>
						</DSCardHeader>

						<DSCardContent>
							<div class="flex flex-wrap gap-2">
								<DSBadge
									v-for="intolerance in pageContent.recipe.value['Food Intolerances']"
									:key="intolerance"
									variant="destructive"
									class="text-xs"
								>
									{{ intolerance }}
								</DSBadge>
							</div>
						</DSCardContent>
					</DSCard>
				</div>

				<div class="space-y-6">
					<DSCard>
						<DSCardHeader>
							<DSCardTitle>{{ $pt('description.title') }}</DSCardTitle>
						</DSCardHeader>

						<DSCardContent>
							<p class="text-sm text-muted-foreground leading-relaxed">
								{{ pageContent.recipe.value.Description }}
							</p>
						</DSCardContent>
					</DSCard>

					<DSCard>
						<DSCardHeader>
							<DSCardTitle>{{ $pt('nutritional.title') }}</DSCardTitle>

							<DSCardDescription>{{ $pt('nutritional.description') }}</DSCardDescription>
						</DSCardHeader>

						<DSCardContent>
							<div class="grid grid-cols-2 gap-4">
								<div class="text-center p-4 bg-blue-50 rounded-lg">
									<div class="text-2xl font-bold text-blue-600">
										{{ pageContent.recipe.value.Calories }}
									</div>

									<div class="text-sm text-blue-600/80">
										{{ $pt('nutritional.calories') }}
									</div>
								</div>

								<div class="text-center p-4 bg-green-50 rounded-lg">
									<div class="text-2xl font-bold text-green-600">
										{{ pageContent.recipe.value.Proteins }}g
									</div>

									<div class="text-sm text-green-600/80">
										{{ $pt('nutritional.proteins') }}
									</div>
								</div>

								<div class="text-center p-4 bg-yellow-50 rounded-lg">
									<div class="text-2xl font-bold text-yellow-600">
										{{ pageContent.recipe.value.Carbohydrates }}g
									</div>

									<div class="text-sm text-yellow-600/80">
										{{ $pt('nutritional.carbohydrates') }}
									</div>
								</div>

								<div class="text-center p-4 bg-orange-50 rounded-lg">
									<div class="text-2xl font-bold text-orange-600">
										{{ pageContent.recipe.value.Fats }}g
									</div>

									<div class="text-sm text-orange-600/80">
										{{ $pt('nutritional.fats') }}
									</div>
								</div>
							</div>
						</DSCardContent>
					</DSCard>

					<div
						v-if="pageContent.recipe.value.Vitamins || pageContent.recipe.value.Minerals"
						class="space-y-4"
					>
						<DSCard v-if="pageContent.recipe.value.Vitamins">
							<DSCardHeader>
								<DSCardTitle class="text-lg">
									{{ $pt('vitamins.title') }}
								</DSCardTitle>
							</DSCardHeader>

							<DSCardContent>
								<p class="text-sm text-muted-foreground">
									{{ pageContent.recipe.value.Vitamins }}
								</p>
							</DSCardContent>
						</DSCard>

						<DSCard v-if="pageContent.recipe.value.Minerals">
							<DSCardHeader>
								<DSCardTitle class="text-lg">
									{{ $pt('minerals.title') }}
								</DSCardTitle>
							</DSCardHeader>

							<DSCardContent>
								<p class="text-sm text-muted-foreground">
									{{ pageContent.recipe.value.Minerals }}
								</p>
							</DSCardContent>
						</DSCard>
					</div>

					<DSCard v-if="pageContent.recipe.value['Total Nutritional Content']">
						<DSCardHeader>
							<DSCardTitle class="text-lg">
								{{ $pt('totalNutritionalContent.title') }}
							</DSCardTitle>
						</DSCardHeader>

						<DSCardContent>
							<p class="text-sm text-muted-foreground leading-relaxed">
								{{ pageContent.recipe.value['Total Nutritional Content'] }}
							</p>
						</DSCardContent>
					</DSCard>

					<DSCard>
						<DSCardHeader>
							<DSCardTitle class="text-lg">
								{{ $pt('ingredientNutritional.title') }}
							</DSCardTitle>

							<DSCardDescription>{{ $pt('ingredientNutritional.description') }}</DSCardDescription>
						</DSCardHeader>

						<DSCardContent>
							<div class="space-y-3">
								<div class="flex justify-between items-center">
									<span class="text-sm text-muted-foreground">{{ $pt('nutritional.calories') }}</span>

									<span class="font-medium">{{ pageContent.recipe.value['Total Ingredient Calories'].toLocaleString() }} kcal</span>
								</div>

								<div class="flex justify-between items-center">
									<span class="text-sm text-muted-foreground">{{ $pt('nutritional.proteins') }}</span>

									<span class="font-medium">{{ pageContent.recipe.value['Total Ingredient Proteins'].toLocaleString() }}g</span>
								</div>

								<div class="flex justify-between items-center">
									<span class="text-sm text-muted-foreground">{{ $pt('nutritional.carbohydrates') }}</span>

									<span class="font-medium">{{ pageContent.recipe.value['Total Ingredient Carbohydrates'].toLocaleString() }}g</span>
								</div>

								<div class="flex justify-between items-center">
									<span class="text-sm text-muted-foreground">{{ $pt('nutritional.fats') }}</span>

									<span class="font-medium">{{ pageContent.recipe.value['Total Ingredient Fats'].toLocaleString() }}g</span>
								</div>
							</div>
						</DSCardContent>
					</DSCard>

					<DSCard>
						<DSCardHeader>
							<DSCardTitle class="text-lg">
								{{ $pt('ingredientList.title') }}
							</DSCardTitle>
						</DSCardHeader>

						<DSCardContent>
							<div class="space-y-2">
								<div
									v-for="(ingredient, index) in pageContent.recipe.value['Ingredient List']"
									:key="index"
									class="flex items-center text-sm"
								>
									<div class="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0" />

									<span>{{ ingredient }}</span>
								</div>
							</div>
						</DSCardContent>
					</DSCard>
				</div>
			</div>
		</div>
	</section>
</template>
