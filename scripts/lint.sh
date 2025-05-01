#!/usr/bin/env sh
npx concurrently --kill-others-on-fail \
	"npm -w front run test:lint" \
	"npm -w bff run test:lint"