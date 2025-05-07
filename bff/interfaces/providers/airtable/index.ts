import { AirtableClient } from "./client";
import { IngredientEntity } from "./entities/ingredient";
import { RecipeEntity } from "./entities/recipe";

export const airtableProvider = {
	db: AirtableClient.db,
	ingredient: IngredientEntity,
	recipe: RecipeEntity,
};

