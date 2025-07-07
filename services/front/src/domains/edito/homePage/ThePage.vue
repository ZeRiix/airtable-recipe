<script setup lang="ts">
import { recipeCreateWithAIPage } from "@/domains/recipe/recipeCreateWithAIPage/router";
import { homePage } from "./router";
import { recipeListPage } from "@/domains/recipe/recipeListPage/router";

const { $pt } = homePage.use();
</script>

<template>
	<section class="space-y-12">
		<div class="space-y-6 text-center">
			<div class="space-y-4">
				<h1 class="text-3xl lg:text-5xl text-primary font-bold">
					{{ $pt("hero.title") }}
				</h1>

				<p class="text-xl lg:text-2xl text-muted-foreground">
					{{ $pt("hero.subtitle") }}
				</p>
			</div>
		</div>

		<DSSeparator />

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<DSCard class="text-center">
				<template #header>
					<div class="mb-4 flex justify-center">
						<div class="size-16 flex justify-center items-center bg-primary/10 text-primary rounded-full">
							<DSIcon
								name="foodDrumstick"
								size="large"
							/>
						</div>
					</div>

					<h2 class="text-lg font-semibold">
						{{ $pt("features.recipes.manual.title") }}
					</h2>
				</template>

				<DSCardDescription>
					{{ $pt("features.recipes.manual.description") }}
				</DSCardDescription>
			</DSCard>

			<DSCard class="text-center">
				<template #header>
					<div class="mb-4 flex justify-center">
						<div class="size-16 flex justify-center items-center bg-primary/10 text-primary rounded-full">
							<DSIcon
								name="robot"
								size="large"
							/>
						</div>
					</div>

					<h2 class="text-lg font-semibold">
						{{ $pt("features.recipes.ai.title") }}
					</h2>
				</template>

				<DSCardDescription>
					{{ $pt("features.recipes.ai.description") }}
				</DSCardDescription>
			</DSCard>

			<DSCard class="text-center">
				<template #header>
					<div class="mb-4 flex justify-center">
						<div class="size-16 flex justify-center items-center bg-primary/10 text-primary rounded-full">
							<DSIcon
								name="poll"
								size="large"
							/>
						</div>
					</div>

					<h2 class="text-lg font-semibold">
						{{ $pt("features.tracking.title") }}
					</h2>
				</template>

				<DSCardDescription>
					{{ $pt("features.tracking.description") }}
				</DSCardDescription>
			</DSCard>
		</div>

		<DSSeparator />

		<div class="space-y-6">
			<div class="space-y-2 text-center">
				<h2 class="text-2xl font-bold">
					{{ $pt("quickActions.title") }}
				</h2>

				<p class="text-muted-foreground">
					{{ $pt("quickActions.description") }}
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
				<RouterLink :to="recipeListPage">
					<DSCard class="hover:shadow-md transition-shadow cursor-pointer group">
						<div class="flex items-center gap-4">
							<div class="shrink-0 size-12 flex justify-center items-center bg-primary/10 text-primary rounded-lg group-hover:bg-primary/20 transition-colors">
								<DSIcon name="viewList" />
							</div>

							<div class="space-y-1">
								<h3 class="font-semibold">
									{{ $pt("quickActions.browse.title") }}
								</h3>

								<p class="text-sm text-muted-foreground">
									{{ $pt("quickActions.browse.description") }}
								</p>
							</div>
						</div>
					</DSCard>
				</RouterLink>

				<RouterLink :to="recipeCreateWithAIPage">
					<DSCard class="hover:shadow-md transition-shadow cursor-pointer group">
						<div class="flex items-center gap-4">
							<div class="shrink-0 size-12 flex justify-center items-center bg-primary/10 text-primary rounded-lg group-hover:bg-primary/20 transition-colors">
								<DSIcon name="plus" />
							</div>

							<div class="space-y-1">
								<h3 class="font-semibold">
									{{ $pt("quickActions.create.title") }}
								</h3>

								<p class="text-sm text-muted-foreground">
									{{ $pt("quickActions.create.description") }}
								</p>
							</div>
						</div>
					</DSCard>
				</RouterLink>
			</div>
		</div>
	</section>
</template>
