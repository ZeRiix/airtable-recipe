import { type FindHttpClientRoute } from "@duplojs/http-client";
import { type AirtableRoutes } from "../../../types/airtableRoutes";

export interface InputFindManyRecipe {
	page: number;
	quantityPerPage: number;
}

export type InputFindOneRecipe = FindHttpClientRoute<
	AirtableRoutes,
	"GET",
	"/Recipes/{recipeId}"
>["params"];

export type InputCreateRecipe = FindHttpClientRoute<
	AirtableRoutes,
	"POST",
	"/Recipes"
>["body"]["records"][number]["fields"];

export type InputDeleteRecipe = FindHttpClientRoute<
	AirtableRoutes,
	"DELETE",
	"/Recipes/{recipeId}"
>["params"];
