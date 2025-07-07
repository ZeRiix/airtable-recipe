import "@vendors/bakend-logger";
import "@duplojs/node";
import "@duplojs/node/globals";
import { Duplo, useProcessBuilder, useRouteBuilder } from "@duplojs/core";

import { cors } from "@vendors/duplo-plugins/cors";
import { debug } from "@vendors/duplo-plugins/debug";
import { duploCookie } from "./plugins/duplo-cookie";

import { envs } from "../envs";
import "./routes";

const duplo = new Duplo({
	environment: envs.ENVIROMENT,
	host: envs.HOST,
	port: envs.PORT,
	disabledZodAccelerator: envs.ENVIROMENT === "DEV",
	plugins: [
		cors(envs.CORS_ALLOW_ORIGIN),
		duploCookie(),
		debug(),
	],
});

duplo.register(
	...useProcessBuilder.getAllCreatedProcess(),
	...useRouteBuilder.getAllCreatedRoute(),
);

duplo.hook(
	"beforeSend",
	(request, response) => {
		console.log(request.path, request.method, response);
	},
);

await duplo.launch(
	// eslint-disable-next-line no-console
	() => void console.log("BFF service is running !"),
);
