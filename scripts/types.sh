#!/usr/bin/env sh
npx concurrently --kill-others-on-fail \
	"npm -w front run test:types" \
	"npm -w bff run test:types"