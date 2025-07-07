<script setup lang="ts">
import { registerPage } from "../registerPage/router";
import { usePage } from "./composables/usePage";
import { loginPage } from "./router";
const router = useRouter();
const { $pt } = loginPage.use();
const { LoginForm, onSubmit } = usePage();

function handleClickRegisterButton() {
	return router.push(
		registerPage.createTo(),
	);
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

		<LoginForm
			@submit="onSubmit"
		>
			<DSPrimaryButton
				type="submit"
			>
				{{ $t("cta.login") }}
			</DSPrimaryButton>
		</LoginForm>

		<div class="text-center">
			<p class="text-sm text-muted-foreground mb-3">
				{{ $pt("noAccount") }}
			</p>

			<DSOutlineButton
				@click="handleClickRegisterButton"
			>
				{{ $t("cta.register") }}
			</DSOutlineButton>
		</div>
	</section>
</template>
