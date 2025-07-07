<script setup lang="ts">
import { usePage } from "./composables/usePage";
import { registerPage } from "./router";

const { $pt } = registerPage.use();
const { RegisterForm, onSubmit } = usePage();

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

		<RegisterForm
			@submit="onSubmit"
		>
			<DSPrimaryButton
				type="submit"
			>
				{{ $t("cta.register") }}
			</DSPrimaryButton>
		</RegisterForm>
	</section>
</template>
