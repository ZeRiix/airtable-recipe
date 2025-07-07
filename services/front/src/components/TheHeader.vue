<script setup lang="ts">
import { useUserInformation } from "@/domains/user/composables/useUserInformation";
import { homePage } from "@/domains/edito/homePage/router";
import { ingredientCreatePage } from "@/domains/ingredient/ingredientCreatePage/router";
import { ingredientListPage } from "@/domains/ingredient/ingredientListPage/router";
import { recipeCreateWithAIPage } from "@/domains/recipe/recipeCreateWithAIPage/router";
import { recipeListPage } from "@/domains/recipe/recipeListPage/router";
import { loginPage } from "@/domains/auth/loginPage/router";
import { profilPage } from "@/domains/user/profilPage/router";
import { recipeCreatePage } from "@/domains/recipe/recipeCreatePage/router";

const { isScrolled } = useScroll({ allowScrollEvent: true });
const { isConnected } = useUserInformation();
</script>

<template>
	<header
		class="sticky top-0 left-0 z-50 bg-background transition-shadow"
		:class="{ 'shadow-md': isScrolled }"
	>
		<div class="container h-[var(--header-height)] flex gap-4 sm:gap-8 items-center justify-between">
			<div class="flex items-center gap-4 sm:gap-8">
				<RouterLink :to="homePage">
					<DSImage
						src="/images/logos/logo-text.svg"
						alt="Seaence"
						class="hidden sm:block w-[158px] h-[40px]"
					/>

					<DSImage
						src="/images/logos/logo.svg"
						alt="Seaence"
						class="block sm:hidden size-[40px]"
					/>
				</RouterLink>

				<nav>
					<ul class="flex items-center gap-2">
						<li>
							<RouterLink :to="ingredientListPage">
								<DSLinkButton>{{ $t("layout.header.nav.ingredientList") }}</DSLinkButton>
							</RouterLink>
						</li>

						<li v-if="isConnected">
							<RouterLink :to="ingredientCreatePage">
								<DSLinkButton>{{ $t("layout.header.nav.ingredientCreate") }}</DSLinkButton>
							</RouterLink>
						</li>

						<li>
							<RouterLink :to="recipeListPage">
								<DSLinkButton>{{ $t("layout.header.nav.recipeList") }}</DSLinkButton>
							</RouterLink>
						</li>

						<li v-if="isConnected">
							<RouterLink :to="recipeCreateWithAIPage">
								<DSLinkButton class="text-primary">
									{{ $t("layout.header.nav.recipeCreateWithAI") }}
								</DSLinkButton>
							</RouterLink>
						</li>

						<li v-if="isConnected">
							<RouterLink :to="recipeCreatePage">
								<DSLinkButton>{{ $t("layout.header.nav.recipeCreate") }}</DSLinkButton>
							</RouterLink>
						</li>
					</ul>
				</nav>
			</div>

			<div class="flex items-center gap-2">
				<RouterLink
					v-if="isConnected"
					:to="profilPage"
				>
					<DSPrimaryButton icon="account">
						{{ $t("layout.header.userMenu.profil") }}
					</DSPrimaryButton>
				</RouterLink>

				<RouterLink
					v-else
					:to="loginPage"
				>
					<DSPrimaryButton icon="account">
						{{ $t("layout.header.userMenu.login") }}
					</DSPrimaryButton>
				</RouterLink>
			</div>
		</div>
	</header>
</template>
