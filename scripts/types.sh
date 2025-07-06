#!/usr/bin/env sh
npx concurrently --kill-others-on-fail \
	--names "FRONT,BFF" \
  	--prefix-colors "blue.bold,green.bold" \
	"npm -w services/front run test:types" \
	"npm -w services/bff run test:types"