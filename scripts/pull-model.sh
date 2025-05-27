#!/usr/bin/env sh
if ! ollama list | grep -q "qwen2.5:3b"; then
  echo "Le modèle qwen2.5:3b n'est pas installé. Installation en cours..."
  ollama pull qwen2.5:3b
fi