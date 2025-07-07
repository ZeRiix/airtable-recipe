<script setup lang="ts">
import type { Recipe } from "@vendors/clients-type/bff/duplojsTypesCodegen";

interface Props {
	recipe: Recipe;
}

defineProps<Props>();

const emit = defineEmits<{
	click: [recipe: Recipe];
}>();

</script>

<template>
	<DSCard
		class="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
		@click="emit('click', recipe)"
	>
		<DSCardContent class="p-4">
			<div class="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
				<DSImage
					v-if="recipe['Recipe Photo']"
					:src="recipe['Recipe Photo']"
					:alt="recipe['Recipe Name']"
					class="w-full h-full object-cover"
				/>

				<div
					v-else
					class="text-gray-400 text-sm"
				>
					{{ $t('recipeCard.noImage') }}
				</div>
			</div>

			<h3 class="font-semibold text-lg mb-2 text-gray-900 line-clamp-2">
				{{ recipe['Recipe Name'] }}
			</h3>

			<p class="text-sm text-gray-600 mb-3 line-clamp-2">
				{{ recipe.Description }}
			</p>

			<div class="flex items-center gap-2 mb-3">
				<DSBadge
					variant="secondary"
					class="text-xs"
				>
					{{ recipe['Dish Type'] }}
				</DSBadge>

				<DSBadge
					variant="outline"
					class="text-xs"
				>
					{{ recipe.Servings }} {{ $t('recipeCard.servings') }}
				</DSBadge>
			</div>

			<div class="space-y-2 mb-4">
				<div class="flex justify-between items-center text-sm">
					<span class="text-gray-600">{{ $t('recipeCard.nutritional.calories') }}</span>

					<span class="font-medium">{{ recipe.Calories }} kcal</span>
				</div>

				<div class="flex justify-between items-center text-sm">
					<span class="text-gray-600">{{ $t('recipeCard.nutritional.proteins') }}</span>

					<span class="font-medium">{{ recipe.Proteins }}g</span>
				</div>

				<div class="flex justify-between items-center text-sm">
					<span class="text-gray-600">{{ $t('recipeCard.nutritional.carbohydrates') }}</span>

					<span class="font-medium">{{ recipe.Carbohydrates }}g</span>
				</div>

				<div class="flex justify-between items-center text-sm">
					<span class="text-gray-600">{{ $t('recipeCard.nutritional.fats') }}</span>

					<span class="font-medium">{{ recipe.Fats }}g</span>
				</div>
			</div>

			<div class="pt-3 border-t border-gray-200">
				<div class="flex justify-between items-center text-sm text-gray-600">
					<span>{{ $t('recipeCard.ingredients') }}</span>

					<span class="font-medium">{{ recipe.Ingredients.length }} {{ $t('recipeCard.ingredientsCount') }}</span>
				</div>
			</div>
		</DSCardContent>
	</DSCard>
</template>
