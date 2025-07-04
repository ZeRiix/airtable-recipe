import "@libs/logger";
import "@duplojs/node";
import "@duplojs/node/globals";
import { Duplo, useProcessBuilder, useRouteBuilder } from "@duplojs/core";

import { duploCors } from "./plugins/duplo-cors";
import { duploCookie } from "./plugins/duplo-cookie";
import { duploDebug } from "./plugins/duplo-debug";

import { envs } from "../envs";
import "./routes";

const duplo = new Duplo({
	environment: envs.ENVIROMENT,
	host: envs.HOST,
	port: envs.PORT,
	disabledZodAccelerator: envs.ENVIROMENT === "DEV",
	plugins: [
		duploCors(envs.CORS_ALLOW_ORIGIN),
		duploCookie(),
		duploDebug(),
	],
});

duplo.register(
	...useProcessBuilder.getAllCreatedProcess(),
	...useRouteBuilder.getAllCreatedRoute(),
);

await duplo.launch(
	// eslint-disable-next-line no-console
	() => void console.log("BFF service is running !"),
);
