import { zod } from "@duplojs/core";
import { program } from "commander";
import "../envs";
import { OllamaProvider } from "@interfaces/providers/ollama";
import { ingredientPrompt } from "@interfaces/providers/ollama/prompts/ingredient";

const nameSchema = zod.string();

program
	.requiredOption("-n, --name <char>");

program.parse();

const { name: rawName } = program.opts<Record<string, string>>();

const name = nameSchema.parse(rawName);

const rawIngredient = await OllamaProvider.sendMessage([
	{
		role: "user",
		content: ingredientPrompt(name),
	},
]).then(
	(value) => JSON.parse(
		value.body.message.content,
	),
);

console.log(rawIngredient);
