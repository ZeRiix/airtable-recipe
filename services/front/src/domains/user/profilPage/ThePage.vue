<script setup lang="ts">
import { homePage } from "@/domains/edito/homePage/router";
import { useUserInformation } from "../composables/useUserInformation";
import { profilPage } from "./router";

const router = useRouter();
const { $pt } = profilPage.use();
const { user, isConnected, disconect } = useUserInformation(
	() => router.push(
		homePage.createTo(),
	),
);

watch(
	isConnected,
	(value) => {
		if (!value) {
			void router.push(homePage.createTo());
		}
	},
);

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

		<div
			v-if="user"
			class="max-w-lg mx-auto"
		>
			<DSCard>
				<DSCardHeader>
					<DSCardTitle>
						{{ $pt("userInfo.title") }}
					</DSCardTitle>

					<DSCardDescription>
						{{ $pt("userInfo.description") }}
					</DSCardDescription>
				</DSCardHeader>

				<DSCardContent>
					<div class="space-y-4">
						<div class="space-y-2">
							<DSLabel class="text-sm font-medium">
								{{ $pt("userInfo.username") }}
							</DSLabel>

							<DSInput
								:model-value="user.username"
								readonly
								class="bg-muted/50"
							/>
						</div>

						<div class="space-y-2">
							<DSLabel class="text-sm font-medium">
								{{ $pt("userInfo.email") }}
							</DSLabel>

							<DSInput
								:model-value="user.email"
								readonly
								class="bg-muted/50"
							/>
						</div>
					</div>
				</DSCardContent>

				<DSCardFooter>
					<DSDestructiveButton
						@click="disconect"
						icon="arrowLeft"
						class="w-full"
					>
						{{ $pt("logout") }}
					</DSDestructiveButton>
				</DSCardFooter>
			</DSCard>
		</div>
	</section>
</template>
