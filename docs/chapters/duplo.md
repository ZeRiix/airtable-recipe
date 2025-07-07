# Framework Duplo - Architecture Backend

Duplo est un framework backend TypeScript innovant créé par **Mathieu Campani**, membre de notre équipe. Il propose une approche unique pour construire des APIs robustes et typées.

## 🌟 Qu'est-ce que Duplo ?

Duplo est un framework web moderne qui met l'accent sur :
- **Type safety** end-to-end
- **Architecture modulaire** avec hooks et plugins
- **Validation automatique** avec Zod
- **Génération de types** pour le frontend
- **Performance** optimisée

## 📚 Documentation officielle

Pour une compréhension complète du framework, consultez la documentation officielle :
👉 **[https://docs.duplojs.dev/fr/latest/](https://docs.duplojs.dev/fr/latest/)**

## 🏗️ Architecture dans notre projet

### Structure du BFF (Backend For Frontend)

```
services/bff/
├── interfaces/
│   ├── http/
│   │   ├── routes/          # Définition des routes
│   │   ├── security/        # Middlewares de sécurité
│   │   ├── checkers/        # Validations métier
│   │   └── plugins/         # Extensions Duplo
│   ├── providers/           # Connecteurs externes
│   │   ├── airtable/       # Client Airtable
│   │   ├── ollama/         # Client IA
│   │   └── token/          # Gestion JWT
│   └── configs/            # Configuration
└── business/
    └── entities/           # Modèles métier
```

## 🛣️ Création de routes avec Duplo

### Route simple

```typescript
// routes/auth/login.ts
useBuilder()
  .createRoute("POST", "/login")
  .extract({
    body: zod.object({
      email: zod.string().email(),
      password: zod.string().min(8).max(100),
    }),
  })
  .handler(
    ({ pickup }) => {
      const { email, password } = pickup("body");
      
      // Logique d'authentification
      
      return new OkHttpResponse("user.login", { token });
    },
    makeResponseContract(OkHttpResponse, "user.login", zod.object({ 
      token: zod.string() 
    })),
  );
```

### Route avec validation métier

```typescript
// routes/ingredient/findOne.ts
useBuilder()
  .createRoute("POST", "/ingredient-find-one")
  .extract({
    body: {
      ingredientId: zod.string(),
    },
  })
  .presetCheck(
    iWantIngredientExistById,  // Checker personnalisé
    (pickup) => pickup("ingredientId"),
  )
  .handler(
    (pickup) => {
      const { ingredient } = pickup(["ingredient"]);
      return new OkHttpResponse("ingredient.found", ingredient);
    },
    makeResponseContract(OkHttpResponse, "ingredient.found", Ingredient.index),
  );
```

## 🔒 Système de sécurité

### Middleware d'authentification

```typescript
// security/mustBeConnected.ts
const mustBeConnectedProcess = createProcess("mustBeConnected")
  .extract({
    cookies: {
      token: zod.string(),
    },
  })
  .cut(({ pickup, dropper }) => {
    const token = pickup("token");
    const payload = TokenProvider.check(token);
    
    if (!payload) {
      return new ForbiddenHttpResponse("token.invalid");
    }
    
    return dropper({ userId: payload.userId });
  })
  .presetCheck(
    iWantUserExistById,
    (pickup) => pickup("userId"),
  )
  .exportation(["user"]);

export function mustBeConnectedRouteBuilder() {
  return useBuilder().preflight(mustBeConnectedProcess, {
    pickup: ["user"],
  });
}
```

### Utilisation dans les routes protégées

```typescript
// routes/ingredient/create.ts
mustBeConnectedRouteBuilder()  // 🔒 Route protégée
  .createRoute("POST", "/ingredient-create")
  .extract({
    body: zod.object({
      name: zod.string().min(3).max(50),
      calories: zod.number().min(0).max(1000),
      // ... autres champs
    }),
  })
  .handler(
    async (pickup) => {
      const { user } = pickup(["user"]);  // Utilisateur disponible
      const ingredientData = pickup("body");
      
      // Création de l'ingrédient
      
      return new OkHttpResponse("ingredient.created", ingredient);
    },
  );
```

## ✅ Système de validation (Checkers)

### Checker personnalisé

```typescript
// checkers/ingredient.ts
const ingredientExistCheck = createChecker("ingredientExist")
  .handler(
    async ({ value }, output) => {
      const ingredient = await airtableProvider.ingredientEntity
        .findOne({ ingredientId: value });
      
      if (ingredient.code === 200) {
        return output("ingredient.exist", ingredient.body);
      } else {
        return output("ingredient.notfound", null);
      }
    },
  );

export const iWantIngredientExistById = createPresetChecker(
  ingredientExistCheck,
  {
    result: "ingredient.exist",
    catch: () => new NotFoundHttpResponse("ingredient.notfound"),
    indexing: "ingredient",
  },
);
```

## 🔌 Système de plugins

### Plugin CORS personnalisé

```typescript
// plugins/cors.ts
export function cors(allowOrigin: string) {
  return function(instance: Duplo) {
    instance.hook("beforeSend", (_request, response) => {
      response.setHeader("Access-Control-Allow-Origin", allowOrigin);
      response.setHeader(
        "Access-Control-Expose-Headers",
        instance.config.keyToInformationInHeaders,
      );
    });
    
    instance.hook("beforeRouteExecution", (request) => {
      if (request.method === "OPTIONS" && request.matchedPath === null) {
        return new OkHttpResponse("cors")
          .setHeader("Access-Control-Allow-Headers", "*");
      }
    });
  };
}
```

### Plugin de gestion des cookies

```typescript
// plugins/duplo-cookie/index.ts
export function duploCookie(options: { secret?: string } = {}) {
  return function(instance: Duplo) {
    instance.hook("beforeRouteExecution", (req) => {
      if (req.headers.cookie) {
        req.cookies = cookie.parse(req.headers.cookie);
      }
    });

    instance.hook("beforeSend", (_req, res) => {
      if (Object.keys(res.cookie).length !== 0) {
        res.setHeader("Set-Cookie", /* ... */);
      }
    });
  };
}
```

## 🎯 Génération de types automatique

Duplo génère automatiquement les types TypeScript pour le frontend :

```typescript
// Côté backend - définition
useBuilder()
  .createRoute("POST", "/recipe-create-with-ai")
  .extract({
    body: zod.object({
      name: zod.string(),
      numberOfPeople: zod.number(),
      recipePhoto: zod.string().url(),
    }),
  })
  .handler(/* ... */);

// Côté frontend - utilisation typée automatique
bffClient.post("/recipe-create-with-ai", {
  body: {
    name: "Pasta Carbonara",        // ✅ Type string
    numberOfPeople: 4,              // ✅ Type number  
    recipePhoto: "https://...",     // ✅ Type string (URL)
  }
})
```

## 🚀 Intégration avec des providers externes

### Provider Airtable

```typescript
// providers/airtable/entities/ingredient.ts
export class IngredientEntity extends AirtableBaseClient {
  async findOne({ ingredientId }: { ingredientId: string }) {
    return this.httpClient
      .get("/Ingredients/{ingredientId}", {
        params: { ingredientId },
      })
      .iWantCode("200", "404");
  }

  async create(data: IngredientCreateData) {
    return this.httpClient
      .post("/Ingredients", {
        body: {
          records: [{
            fields: this.mapToAirtableFields(data),
          }],
        },
      })
      .iWantCode("200");
  }
}
```

### Provider Ollama (IA)

```typescript
// providers/ollama/index.ts
export class OllamaProvider {
  static sendMessage(messages: Message[]) {
    return this.httpClient.post("/api/chat", {
      body: {
        model: "qwen2.5:3b",
        messages,
        format: "json",
        stream: false,
      },
    }).iWantCode("200");
  }
}
```

## ⚡ Performance et optimisation

### Accélérateur Zod

```typescript
// Optimisation automatique des validations
const payloadSchema = zod.object({
  userId: zod.string(),
  username: zod.string(),
  email: zod.string(),
});

// ZodAccelerator améliore les performances
const optimizedSchema = ZodAccelerator.build(payloadSchema);
```

### Configuration de production

```typescript
// main.ts
const duplo = new Duplo({
  environment: envs.ENVIRONMENT,
  host: envs.HOST,
  port: envs.PORT,
  disabledZodAccelerator: envs.ENVIRONMENT === "DEV", // Activé en prod
  plugins: [
    cors(envs.CORS_ALLOW_ORIGIN),
    duploCookie(),
    debug(),
  ],
});
```

## 🎯 Avantages de Duplo

### ✅ Type Safety
- Validation automatique des entrées/sorties
- Génération de types pour le frontend
- Erreurs de compilation au lieu d'erreurs runtime

### ✅ Modularité
- Système de plugins extensible
- Hooks pour personnaliser le comportement
- Architecture en couches claire

### ✅ Developer Experience
- API fluide et intuitive
- Hot reload en développement
- Debugging facilité avec le plugin debug

### ✅ Performance
- Optimisations automatiques
- Gestion native des cookies et sessions
- Sérialisation JSON optimisée

### ✅ Écosystème
- Intégration TypeScript native
- Support Zod intégré
- Compatible avec l'écosystème Node.js

## 🔗 Liens utiles

- [Documentation officielle](https://docs.duplojs.dev/fr/latest/)
- [Repository GitHub](https://github.com/duplojs/duplojs)
- [Exemples d'utilisation](https://docs.duplojs.dev/fr/latest/examples/)

---

> **Note** : Duplo continue d'évoluer avec de nouvelles fonctionnalités régulièrement. C'est un framework moderne qui repense la façon de construire des APIs robustes en TypeScript.
