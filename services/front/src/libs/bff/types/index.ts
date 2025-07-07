import { type FindHttpClientRouteResponse, type FindHttpClientRoute } from "@duplojs/http-client";
import type { BffClientRoute } from "..";

export type ResponseOfCreateRecipeWithAI = FindHttpClientRouteResponse<
	FindHttpClientRoute<BffClientRoute, "POST", "/recipe-create-with-ai">,
	"information",
	"recipe.createdWithAI"
>["body"];

export type User = FindHttpClientRouteResponse<
	FindHttpClientRoute<BffClientRoute, "GET", "/me">,
	"information",
	"user.found"
>["body"];
