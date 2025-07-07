<script setup lang="ts">
import { usePage } from "./composables/usePage";
import { ingredientCreatePage } from "./router";

const { $pt } = ingredientCreatePage.use();
const { CreateIngredientForm, onSubmit } = usePage();

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

		<CreateIngredientForm
			@submit="onSubmit"
		>
			<DSPrimaryButton
				type="submit"
			>
				{{ $t("cta.add") }}
			</DSPrimaryButton>
		</CreateIngredientForm>
	</section>
</template>
