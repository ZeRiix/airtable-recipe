# Airtable Recipe - POC IA et Recettes

Un projet de démonstration (POC) développé dans le cadre de l'ESGI, illustrant l'intégration d'Airtable avec une IA locale (Ollama) pour la création automatique de recettes culinaires.

## 📋 Vue d'ensemble

Ce projet est un monorepo Node.js démontrant comment créer une application de gestion de recettes avec génération automatique via intelligence artificielle. Il utilise :

- **Frontend** : Vue.js avec une architecture domains/pages
- **Backend** : Framework Duplo (créé par Mathieu Campani)
- **Base de données** : Airtable
- **IA** : Ollama avec le modèle qwen2.5:3b
- **Conteneurisation** : Docker

## 🚀 Installation rapide

### Prérequis
- Docker et Docker Compose
- Ollama (installation détaillée ci-dessous)

### Lancement du projet

```bash
# Clone le repository
git clone <votre-repository>
cd airtable

# Installation d'Ollama (voir section dédiée)
# Puis lancement du projet
npm run dev
```

La commande `npm run dev` :
- Lance Ollama en arrière-plan
- Démarre les conteneurs Docker
- Télécharge automatiquement le modèle IA qwen2.5:3b si nécessaire
- Configure et lance toute l'infrastructure

## 📖 Documentation

- [Sommaire](./docs/README.md)
- [Guide d'installation d'Ollama](./docs/chapters/ollama-install.md)
- [Parcours utilisateur](./docs/chapters/userJourney.md)
- [Architecture Vue.js](./docs/chapters/archi-vue.md)
- [Framework Duplo](./docs/chapters/duplo.md)
- [Guide d'installation complète](./docs/chapters/install.md)

## 🛠️ Commandes disponibles

```bash
npm run dev           # Lancement en développement
npm run test:lint     # Vérification du linting
npm run test:types    # Vérification des types TypeScript
npm run clear         # Suppression des dépendances
```

## 👥 Contributeurs

- [mathcovax](https://github.com/mathcovax) - Créateur du framework Duplo
- [ZeRiix](https://github.com/ZeRiix)
- [justinDev91](https://github.com/justinDev91)

## 📝 Licence

MIT

---

> **Note** : Ce projet est un POC éducatif démontrant l'intégration de technologies modernes pour la création d'applications web avec IA.