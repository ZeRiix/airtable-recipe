import { AirtableClient } from "../client";
import { type Recipe, recipeSchema } from "../schemas/recipe";

export class RecipeEntity extends AirtableClient {
	public static async findPerPage(page: number, perPage: number) {
		const offset = page * perPage;

		return new Promise<Recipe[]>((resolve) => {
			AirtableClient.db("Recipes")
				.select({
					maxRecords: perPage,
					offset: offset,
					view: "Grid view",
				})
				.firstPage((err, records) => {
					if (err) {
						throw err instanceof Error
							? err
							: new Error(String(err));
					}

					if (!records) {
						resolve([]);
						return;
					}

					const Recipe = records.map(
						(record) => ({
							id: record.id,
							...record.fields,
						}),
					);

					const parsedRecipe = recipeSchema.array().parse(Recipe);
					resolve(parsedRecipe);
				});
		});
	}

	public static async create(recipe: Omit<Recipe, "id">) {
		return new Promise<Recipe>((resolve) => {
			AirtableClient.db("Recipes").create(
				[
					{
						fields: recipe,
					},
				],
				(err, records) => {
					if (err) {
						throw err instanceof Error
							? err
							: new Error(String(err));
					}

					if (!records) {
						throw new Error("Aucun enregistrement n'a été créé");
					}

					const [firstField] = records;

					const createdRecipe = {
						id: firstField.id,
						...firstField.fields,
					};

					const parsedRecipe = recipeSchema.parse(createdRecipe);
					resolve(parsedRecipe);
				},
			);
		});
	}

	public static async update(id: string, recipe: Partial<Omit<Recipe, "id">>) {
		return new Promise<Recipe>((resolve) => {
			AirtableClient.db("Recipes").update(
				[
					{
						id: id,
						fields: recipe,
					},
				],
				(err, records) => {
					if (err) {
						throw err instanceof Error ? err : new Error(String(err));
					}

					if (!records) {
						throw new Error("Aucun enregistrement n'a été mis à jour");
					}

					const [firstRecord] = records;

					const updatedRecipe = {
						id: firstRecord.id,
						...firstRecord.fields,
					};

					const parsedRecipe = recipeSchema.parse(updatedRecipe);
					resolve(parsedRecipe);
				},
			);
		});
	}

	public static async delete(id: string) {
		return new Promise<boolean>((resolve) => {
			AirtableClient
				.db("Recipes")
				.destroy(
					id,
					(err, deletedRecord) => {
						if (err) {
							throw err instanceof Error ? err : new Error(String(err));
						}

						if (!deletedRecord) {
							throw new Error("Aucun enregistrement n'a été supprimé");
						}

						resolve(true);
					},
				);
		});
	}
}
