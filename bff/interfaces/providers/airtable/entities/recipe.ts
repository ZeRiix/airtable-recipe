import { AirtableClient } from "../client";
import { type Recipe, recipeSchema } from "../schemas/recipe";

export class RecipeEntity extends AirtableClient {
	public static async getById(id: string) {
		return new Promise<Recipe>((resolve) => {
			AirtableClient.db("Recipes")
				.find(id, (err, record) => {
					if (err) {
						throw err instanceof Error
							? err
							: new Error(String(err));
					}

					if (!record) {
						throw Error("recipe does not exist");
					}

					const foundRecipe = {
						id: record.id,
						...record.fields,
					};

					const parsedRecipe = recipeSchema.parse(foundRecipe);
					resolve(parsedRecipe);
				});
		});
	}

	public static async create(recipe: Omit<Recipe, "id" | "createdAt">) {
		const result = await AirtableClient
			.db("Recipes")
			.create(
				[
					{
						fields: recipe,
					},
				],
			);

		const [firstRecord] = result;

		return recipeSchema.parse({
			id: firstRecord.id,
			...Array.from(result).pop()?.fields,
		});
	}

	public static async findLast() {
		const result = await AirtableClient.db("Recipes")
			.select({
				maxRecords: 1,
				sort: [
					{
						field: "createdAt",
						direction: "desc",
					},
				],
				view: "Grid view",
			})
			.all();

		const [firstRecord] = result;

		return recipeSchema.parse({
			id: firstRecord.id,
			...Array.from(result).pop()?.fields,
		});
	}

	public static async search(value: string) {
		const result = await AirtableClient.db("Recipes")
			.select({
				filterByFormula: `OR(
					FIND('${value}', LOWER({Recipe Name})),
					FIND('${value}', LOWER({Description}))
				)`,
				view: "Grid view",
			})
			.all();

		return result.map((record) => recipeSchema.parse({
			id: record.id,
			...record.fields,
		}));
	}
}
