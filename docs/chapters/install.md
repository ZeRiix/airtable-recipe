# Guide d'installation complète

Ce guide vous accompagne dans l'installation et la configuration complète du projet Airtable Recipe.

## 📋 Prérequis

### Logiciels requis

- **Docker** et **Docker Compose**
- **Ollama** (voir [guide dédié](./ollama-install.md))

### Vérification des prérequis

```bash
# Vérifier Docker
docker --version

# Vérifier Ollama (après installation)
ollama --version
```

## 🚀 Installation du projet

### 1. Clonage du repository

```bash
git clone <votre-repository-url>
cd airtable
```

### 2. Installation des dépendances

Le projet utilise des workspaces npm pour gérer le monorepo :

```bash
# Installation de toutes les dépendances du monorepo
npm install # pas nécessaire car s'install tout seul aux lancement des containers
```

Cette commande installe automatiquement les dépendances pour :
- Le projet racine
- Toutes les librairies (`libs/*`)
- Tous les services (`services/*`)

### 3. Configuration de l'environnement

#### Variables d'environnement BFF

Créez un fichier `.env.local` dans `services/bff/` :

```bash
AIRTABLE_API_KEY=secret
JWT_SECRET=secret
```

### 4. Configuration de la base de données

Le projet utilise Prisma avec SQLLite via Docker :

```bash
# Lancement de la base de données
docker compose up
cd services/bff

# Génération du client Prisma
docker compose exec bff npm -w services/bff run prisma:generate

# Migration de la base de données
docker compose exec bff npm -w services/bff run prisma:apply-migration
```

Si il y aun soucis créer le fichier `dev.db` dans `services/bff/interfaces/providers/prisma` puis relancer les commandes

## 🎯 Lancement du projet

```bash
# Depuis la racine du projet
npm run dev
```

Cette commande lance automatiquement :
- ✅ Ollama en arrière-plan
- ✅ Tous les conteneurs Docker
- ✅ Téléchargement du modèle IA (si nécessaire)
- ✅ Le serveur backend (port 1506)
- ✅ Le serveur frontend (port 3000)

## 🌐 Accès à l'application

Une fois lancé, l'application est accessible sur :

- **Frontend** : [http://localhost:3000](http://localhost:3000)
- **Backend For the Front** : [http://localhost:1506](http://localhost:1506)

## 🧪 Vérification de l'installation

# Test d'Ollama

```bash
curl http://localhost:11434/api/tags
```

# Test de la base de données

```bash
npm -w services/bff run prisma:studio  # Interface web sur http://localhost:5555
```

### Tests fonctionnels

1. **Accès aux pages publiques** :
   - [Page d'accueil](http://localhost:3000)
   - [Liste des recettes](http://localhost:3000/recipe-list)
   - [Liste des ingrédients](http://localhost:3000/ingredient-list)

2. **Test d'inscription** :
   - Allez sur [/register](http://localhost:3000/register)
   - Créez un compte de test

3. **Test de l'IA** :
   - Connectez-vous
   - Allez sur [/recipe-create-with-ai](http://localhost:3000/recipe-create-with-ai)
   - Testez la génération de recette

## 🔧 Commandes de développement

```bash
# Linting
npm run test:lint

# Vérification des types TypeScript
npm run test:types

# Build du projet
npm run build

# Nettoyage
npm run clear
```

## 📁 Structure du projet après installation

```
airtable/
├── node_modules/          # Dépendances racine
├── libs/                  # Librairies partagées
│   ├── backend-logger/
│   ├── design-system/
│   ├── duplo-plugins/
│   └── entity-rules/
├── services/
│   ├── bff/              # Backend API
│   │   ├── node_modules/
│   │   ├── .env          # ⚠️ À créer
│   │   └── ...
│   └── front/            # Frontend Vue.js
│       ├── node_modules/
│       ├── .env          # ⚠️ À créer
│       └── ...
├── scripts/              # Scripts de build/dev
├── docs/                 # Documentation
└── package.json
```

## 🐛 Dépannage

### Problèmes courants

#### Ollama ne démarre pas
```bash
# Vérifier qu'Ollama est bien installé
ollama --version

# Redémarrer Ollama
pkill ollama
ollama serve
```

#### Problèmes de dépendances
```bash
# Nettoyage complet et réinstallation
npm run clear
npm install
```

### Logs de débogage

```bash
# Logs Docker
docker-compose logs -f

# Logs du backend
cd services/bff
npm run dev -- --debug

# Logs du frontend
cd services/front
npm run dev -- --debug
```

## ✅ Installation réussie !

Si vous pouvez :
- ✅ Accéder à [http://localhost:3000](http://localhost:3000)
- ✅ Voir la liste des recettes
- ✅ Créer un compte utilisateur
- ✅ Générer une recette avec l'IA

Félicitations ! Votre installation est complète et fonctionnelle.

## 🚀 Prochaines étapes

1. Consultez le [parcours utilisateur](./userJourney.md) pour comprendre l'application
2. Lisez la documentation sur [l'architecture Vue.js](./archi-vue.md)
3. Découvrez le [framework Duplo](./duplo.md)
4. Commencez à développer de nouvelles fonctionnalités !

## 📞 Support

En cas de problème :
1. Vérifiez les prérequis et variables d'environnement
2. Consultez les logs d'erreur
3. Vérifiez la documentation des outils utilisés
