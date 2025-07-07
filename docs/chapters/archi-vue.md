# Architecture Vue.js - Approche Domain-Driven

Notre projet utilise une architecture Vue.js innovante basée sur les domaines métier, avec une utilisation intensive des composables pour séparer la logique métier de l'affichage.

## 📁 Structure des domaines

```
src/domains/
├── auth/                    # Authentification
│   ├── loginPage/
│   │   ├── router.ts       # Configuration de route
│   │   ├── ThePage.vue     # Composant de page
│   │   └── composables/
│   │       ├── usePage.ts  # Logique de page
│   │       └── useLoginForm.ts
│   └── registerPage/
├── edito/                   # Pages éditoriales
│   ├── homePage/
│   └── notFoundPage/
├── ingredient/              # Gestion des ingrédients
│   ├── ingredientListPage/
│   ├── ingredientDetailsPage/
│   └── ingredientCreatePage/
├── recipe/                  # Gestion des recettes
│   ├── recipeListPage/
│   ├── recipeDetailsPage/
│   ├── recipeCreatePage/
│   └── recipeCreateWithAIPage/
└── user/                    # Gestion utilisateur
    ├── profilPage/
    └── composables/
        └── useUserInformation.ts
```

## 🎯 Philosophie : Pages sans logique

**Principe fondamental** : Les pages Vue ne contiennent **aucune logique métier**. Tout est déporté dans des composables dédiés.

### Exemple de page épurée

```vue
<!-- ThePage.vue -->
<script setup lang="ts">
import { usePage } from "./composables/usePage";
import { loginPage } from "./router";

const { $pt } = loginPage.use();
const { LoginForm, onSubmit } = usePage();
</script>

<template>
  <section class="space-y-6">
    <h1>{{ $pt("title") }}</h1>
    <LoginForm @submit="onSubmit">
      <DSPrimaryButton type="submit">
        {{ $t("cta.login") }}
      </DSPrimaryButton>
    </LoginForm>
  </section>
</template>
```

## 🔧 Pattern des composables de page

Chaque page dispose d'un composable `usePage()` qui orchestre toute la logique :

```typescript
// composables/usePage.ts
export function usePage() {
  const router = useRouter();
  
  const {
    LoginForm,
    check,
  } = useLoginForm();
  
  const { fetchInformation } = useUserInformation();

  function onSubmit() {
    const result = check();
    if (!result) return;

    return bffClient.post("/login", { body: result })
      .whenInformation("user.login", () => {
        void fetchInformation();
        void router.push(homePage.createTo());
      });
  }

  return {
    LoginForm,
    onSubmit,
  };
}
```

## 🛠️ Système de routing typé

### Configuration de route avec validation

```typescript
// router.ts
export const ingredientDetailsPage = createPage(
  "ingredientDetails",
  {
    path: "/ingredient-details/:ingredientId",
    component: () => import("./ThePage.vue"),
    params: {
      ingredientId: zod.string(), // Validation automatique
    },
  },
);
```

### Utilisation dans les composables

```typescript
export function usePage() {
  const { params } = ingredientDetailsPage.use();
  
  // params.value.ingredientId est typé et validé automatiquement
  const { ingredient } = useGetIngredient(
    params.value.ingredientId,
    () => void router.back(),
  );
}
```

## 📋 Gestion des formulaires avec useFormBuilder

Nous utilisons un système de formulaires typé et robuste inventé par Mathieu :

```typescript
export function useLoginForm() {
  const { Form, check } = useFormBuilder(
    useMultiFieldLayout({
      email: useCheckLayout(
        textFormField,
        {
          mandatory: true,
          label: "Email",
          schema: zod.string().email(),
        },
      ),
      password: useCheckLayout(
        textFormField,
        {
          mandatory: true,
          label: "Mot de passe", 
          schema: zod.string()
            .min(8, { message: "Minimum 8 caractères" })
            .max(100, { message: "Maximum 100 caractères" }),
        },
      ),
    }),
  );

  return { Form, check };
}
```

### Avantages du useFormBuilder

✅ **Validation automatique** avec Zod  
✅ **Types TypeScript stricts**  
✅ **Gestion d'erreurs intégrée**  
✅ **Accessibilité native**  
✅ **Styles cohérents**  
✅ **Réactivité Vue optimisée**

## 🔄 Gestion d'état global

### Composable d'authentification

```typescript
// useUserInformation.ts
const globalUser = ref<User | null>(null);
const globalIsConnected = ref(false);

export function useUserInformation(whenFindError?: () => void) {
  function fetchInformation() {
    return bffClient.get("/me")
      .whenInformation("user.found", ({ body }) => {
        globalUser.value = body;
        globalIsConnected.value = true;
      })
      .whenRequestError(() => {
        disconect();
        whenFindError?.();
      });
  }

  return {
    user: globalUser,
    isConnected: globalIsConnected,
    fetchInformation,
    disconect,
  };
}
```

## 🎨 Design System intégré

### Auto-import des composants

```typescript
// vite.config.ts
autoImportComponents({
  dirs: [
    "src/components",
    "vendors/design-system", // Composants design system
  ],
})
```

### Utilisation transparente

```vue
<template>
  <!-- Composants disponibles automatiquement -->
  <DSCard>
    <DSPrimaryButton @click="handleClick">
      Valider
    </DSPrimaryButton>
  </DSCard>
</template>
```

## 🌐 Internationalisation (i18n)

### Traductions par page

```typescript
// Dans usePage()
const { $pt } = loginPage.use();

// $pt = Page Translation - traductions spécifiques à la page
$pt("form.label.email") // → "Adresse email"
$pt("title")            // → "Connexion"

// $t = traductions globales
$t("cta.login")         // → "Se connecter"
```

## 🔌 Communication avec l'API

### Client HTTP typé

```typescript
// Requête typée avec gestion d'erreurs
return bffClient.post("/recipe-create-with-ai", {
  body: {
    name: "Pasta Carbonara",
    numberOfPeople: 4,
    recipePhoto: "https://example.com/photo.jpg"
  }
})
.whenInformation("recipe.createdWithAI", ({ body }) => {
  // body est automatiquement typé
  result.value = body;
})
.whenRequestError((error) => {
  // Gestion d'erreur globale
});
```

## 🏗️ Structure modulaire

### Séparation des responsabilités

- **Pages** : Affichage uniquement
- **Composables de page** : Orchestration
- **Composables métier** : Logique réutilisable
- **Router** : Configuration des routes
- **Design System** : Composants UI

### Exemple complet d'un domaine

```
recipe/recipeCreateWithAIPage/
├── router.ts                     # Route typée
├── ThePage.vue                   # Vue pure
└── composables/
    ├── usePage.ts               # Orchestration
    └── useCreateRecipeWithAIForm.ts  # Logique formulaire
```

## 🚀 Avantages de cette architecture

### ✅ Testabilité
- Logique séparée de l'affichage
- Composables unitaires testables
- Mocking facilité

### ✅ Réutilisabilité
- Composables partagés entre domaines
- Logic métier découplée
- Composants design system unifiés

### ✅ Maintenabilité
- Code organisé par domaine métier
- Responsabilités claires
- Typage strict end-to-end

### ✅ Performance
- Lazy loading des pages
- Tree-shaking optimisé
- Réactivité Vue native

### ✅ Developer Experience
- Auto-complétion TypeScript
- Hot reload instantané
- Debugging facilité

## 🎯 Vue.js : Le choix parfait

Cette architecture démontre la **flexibilité exceptionnelle de Vue.js** :

- **Composition API** pour une logique claire
- **Réactivité fine** pour des performances optimales  
- **Écosystème riche** (Vue Router, i18n, etc.)
- **TypeScript first** pour un développement robuste
- **Simplicité d'apprentissage** pour les nouveaux développeurs

> *"Vue.js n'impose rien mais permet tout"* - Cette architecture en est la preuve parfaite !
