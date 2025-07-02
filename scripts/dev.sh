#!/usr/bin/env sh
npx concurrently \
  --kill-others-on-fail \
  --names "OLLAMA,DOCKER,PULL-MODEL" \
  --prefix-colors "blue.bold,green.bold,yellow.bold" \
  --prefix "[{name}]" \
  "ollama serve" \
  "docker-compose up" \
  "./scripts/pull-model.sh"