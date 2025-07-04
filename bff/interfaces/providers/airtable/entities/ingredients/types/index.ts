
import { type FindHttpClientRoute } from "@duplojs/http-client";
import { type AirtableRoutes } from "@interfaces/providers/airtable/types/airtableRoutes";

export interface InputFindManyIngredient {
	quantityPerPage: number;
	page: number;
}

export type InputFindOneIngredient = FindHttpClientRoute<
	AirtableRoutes,
	"GET",
	"/Ingredients/{ingredientId}"
>["params"];

export type InputCreateIngredient = FindHttpClientRoute<
	AirtableRoutes,
	"POST",
	"/Ingredients"
>["body"]["records"][number]["fields"];

export type InputDeleteIngredient = FindHttpClientRoute<
	AirtableRoutes,
	"DELETE",
	"/Ingredients/{ingredientId}"
>["params"];
