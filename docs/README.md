# Documentation du projet Airtable Recipe

Bienvenue dans la documentation complète du projet Airtable Recipe ! Ce POC démontre l'intégration d'Airtable avec une IA locale pour la génération de recettes culinaires.

## 🎯 Objectif du projet

Créer une application web de gestion de recettes qui utilise :
- **Airtable** comme base de données
- **Ollama** pour la génération de recettes par IA
- **Vue.js** avec une architecture domain-driven
- **Duplo** comme framework backend innovant

## 📚 Sommaire de la documentation

### 🚀 Mise en route
- [Installation complète](./chapters/install.md) - Guide pas à pas pour installer le projet
- [Installation d'Ollama](./chapters/ollama-install.md) - Configuration de l'IA locale

### 👤 Utilisation
- [Parcours utilisateur](./chapters/userJourney.md) - Découverte complète de l'application avec captures d'écran

### 🏗️ Architecture technique
- [Architecture Vue.js](./chapters/archi-vue.md) - Approche domain-driven et composables
- [Framework Duplo](./chapters/duplo.md) - Backend avec le framework de Mathieu Campani

## 🎮 Démo rapide

```bash
# Installation d'Ollama (voir guide détaillé)
curl -fsSL https://ollama.com/install.sh | sh  # Linux/macOS
# macos # regarder la page brew d'installation

# Lancement du projet complet
git clone <repository>
cd airtable
npm run dev
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000)

## 🌟 Fonctionnalités principales

### Accès libre (sans connexion)
- 📋 Consultation des recettes et ingrédients
- 🔍 Détails nutritionnels complets
- 📱 Interface responsive moderne

### Fonctionnalités connectées
- 👤 Gestion de profil utilisateur
- ➕ Création d'ingrédients personnalisés
- 🍳 Création manuelle de recettes
- 🤖 **Génération automatique de recettes par IA**

## 🤖 Innovation : Création par IA

La fonctionnalité phare du projet utilise Ollama pour générer automatiquement :
- Liste d'ingrédients adaptés
- Quantités selon le nombre de convives
- Instructions de préparation détaillées
- Calculs nutritionnels automatiques

## 🛠️ Stack technique

### Frontend
- **Vue.js 3** avec Composition API
- **TypeScript** pour le typage strict
- **Tailwind CSS** pour le design
- **Vue Router** avec validation de paramètres
- **i18n** pour l'internationalisation

### Backend
- **Duplo** (framework de Mathieu Campani)
- **TypeScript** avec génération de types
- **Zod** pour la validation
- **Prisma** pour la base de données
- **JWT** pour l'authentification

### Infrastructure
- **Docker** pour la conteneurisation
- **Airtable** comme base de données
- **Ollama** pour l'IA locale
- **Monorepo** avec workspaces npm

## 🏗️ Architecture du monorepo

```
airtable/
├── libs/                    # Librairies partagées
│   ├── design-system/      # Composants UI réutilisables
│   ├── duplo-plugins/      # Extensions Duplo
│   ├── entity-rules/       # Règles de validation
│   └── clients-type/       # Types générés automatiquement
├── services/
│   ├── bff/               # Backend For Frontend (Duplo)
│   └── front/             # Application Vue.js
├── scripts/               # Scripts de build et développement
└── docs/                  # Documentation
```

## 🎓 Aspects pédagogiques

Ce projet illustre plusieurs concepts avancés :

### Architecture Frontend
- **Domain-Driven Design** avec Vue.js
- **Composables** pour la séparation des responsabilités
- **Formulaires typés** avec validation automatique
- **Routing typé** avec validation des paramètres

### Architecture Backend
- **API typée** end-to-end
- **Middleware de sécurité** personnalisés
- **Validation métier** avec checkers
- **Intégration externe** (Airtable, Ollama)

### DevOps et outils
- **Monorepo** avec workspaces
- **Docker Compose** pour l'orchestration
- **Scripts automatisés** pour le développement
- **Type generation** automatique

## 🚦 Status du projet

✅ **Fonctionnel** - Toutes les fonctionnalités principales implémentées  
✅ **Documenté** - Documentation complète disponible  
✅ **Testé** - Architecture validée et robuste  
🎯 **POC** - Démonstration de concepts innovants

## 🤝 Équipe

- **[mathcovax](https://github.com/mathcovax)** - Créateur du framework Duplo
- **[ZeRiix](https://github.com/ZeRiix)** - Architecture et développement
- **[justinDev91](https://github.com/justinDev91)** - Développement et intégration

## 📞 Support

Pour toute question :
1. Consultez d'abord cette documentation
2. Vérifiez les [guides d'installation](./chapters/install.md)
3. Référez-vous à la [documentation Duplo](https://docs.duplojs.dev/fr/latest/)
4. Issue github tag [ZeRiix](https://github.com/ZeRiix)
---

**Bonne exploration du code ! 🚀**
