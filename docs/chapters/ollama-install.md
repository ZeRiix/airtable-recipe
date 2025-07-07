# Installation d'Ollama

Ollama est requis pour faire fonctionner l'IA de génération de recettes. Voici comment l'installer selon votre système d'exploitation.

## 🐧 Linux

### Installation via le script officiel
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### Installation manuelle
1. Téléchargez le binaire depuis [ollama.com](https://ollama.com)
2. Rendez-le exécutable et déplacez-le dans votre PATH :
```bash
chmod +x ollama
sudo mv ollama /usr/local/bin/
```

## 🍎 macOS

### Via Homebrew (recommandé)
```bash
brew install ollama
```

### Téléchargement direct
1. Téléchargez l'application depuis [ollama.com](https://ollama.com)
2. Glissez-déposez dans votre dossier Applications
3. Lancez l'application une première fois

## 🪟 Windows

### Installation via l'installateur
1. Téléchargez l'installateur Windows depuis [ollama.com](https://ollama.com)
2. Exécutez le fichier `.exe` et suivez les instructions
3. Redémarrez votre terminal après l'installation

### Via Windows Subsystem for Linux (WSL)
Si vous utilisez WSL, suivez les instructions Linux ci-dessus.

## ✅ Vérification de l'installation

Après l'installation, vérifiez qu'Ollama fonctionne :

```bash
ollama --version
```

Vous devriez voir la version d'Ollama s'afficher.

## 🚀 Premier lancement

Le projet se charge automatiquement de télécharger le modèle requis (`qwen2.5:3b`) lors du premier lancement avec `npm run dev`.

Si vous souhaitez télécharger le modèle manuellement :

```bash
ollama pull qwen2.5:3b
```

## 🔧 Configuration

Ollama démarre automatiquement avec le projet. Le serveur Ollama écoute par défaut sur `http://localhost:11434`.

Si vous rencontrez des problèmes de port, vous pouvez configurer Ollama pour utiliser un port différent :

```bash
export OLLAMA_HOST=0.0.0.0:11435
ollama serve
```

## 📋 Modèles supportés

Le projet utilise actuellement le modèle `qwen2.5:3b` qui offre un bon équilibre entre performance et qualité pour la génération de recettes.

D'autres modèles peuvent être utilisés en modifiant la configuration dans le code source (voir `services/bff/interfaces/providers/ollama/index.ts`).

## 🐛 Dépannage

### Ollama ne démarre pas
- Vérifiez que le port 11434 n'est pas utilisé par un autre processus
- Sur Linux/macOS, vérifiez les permissions d'exécution
- Redémarrez votre terminal après l'installation

### Le modèle ne se télécharge pas
- Vérifiez votre connexion internet
- Assurez-vous d'avoir suffisamment d'espace disque (le modèle fait environ 2.2GB)
- Essayez de télécharger manuellement : `ollama pull qwen2.5:3b`

### Erreur de connexion
- Vérifiez qu'Ollama est bien démarré : `ollama list`
- Vérifiez l'URL dans la configuration du projet
- Testez manuellement : `curl http://localhost:11434/api/tags`

## 📚 Ressources

- [Documentation officielle Ollama](https://ollama.com/docs)
- [Liste des modèles disponibles](https://ollama.com/library)
- [Guide de dépannage Ollama](https://ollama.com/docs/troubleshooting)
