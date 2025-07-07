<script setup lang="ts">
import type { Ingredient } from "@vendors/clients-type/bff/duplojsTypesCodegen";

interface Props {
	ingredient: Ingredient;
}

defineProps<Props>();

const emit = defineEmits<{
	click: [ingredient: Ingredient];
}>();

</script>

<template>
	<DSCard
		class="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
		@click="emit('click', ingredient)"
	>
		<DSCardContent class="p-4">
			<div class="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
				<DSImage
					v-if="ingredient['Ingredient Photo']"
					:src="ingredient['Ingredient Photo']"
					:alt="ingredient['Ingredient Name']"
					class="w-full h-full object-cover"
				/>

				<div
					v-else
					class="text-gray-400 text-sm"
				>
					{{ $t('ingredientCard.noImage') }}
				</div>
			</div>

			<h3 class="font-semibold text-lg mb-2 text-gray-900 line-clamp-2">
				{{ ingredient['Ingredient Name'] }}
			</h3>

			<div class="space-y-2 mb-4">
				<div class="flex justify-between items-center text-sm">
					<span class="text-gray-600">{{ $t('ingredientCard.nutritional.calories') }}</span>

					<span class="font-medium">{{ ingredient.Calories }} kcal</span>
				</div>

				<div class="flex justify-between items-center text-sm">
					<span class="text-gray-600">{{ $t('ingredientCard.nutritional.proteins') }}</span>

					<span class="font-medium">{{ ingredient.Proteins }}g</span>
				</div>

				<div class="flex justify-between items-center text-sm">
					<span class="text-gray-600">{{ $t('ingredientCard.nutritional.carbohydrates') }}</span>

					<span class="font-medium">{{ ingredient.Carbohydrates }}g</span>
				</div>

				<div class="flex justify-between items-center text-sm">
					<span class="text-gray-600">{{ $t('ingredientCard.nutritional.fats') }}</span>

					<span class="font-medium">{{ ingredient.Fats }}g</span>
				</div>
			</div>

			<div class="pt-3 border-t border-gray-200">
				<div class="flex justify-between items-center text-sm text-gray-600">
					<span>{{ $t('ingredientCard.relatedRecipes') }}</span>

					<span class="font-medium">{{ ingredient['Number of Recipes Using Ingredient'] }}</span>
				</div>
			</div>
		</DSCardContent>
	</DSCard>
</template>
