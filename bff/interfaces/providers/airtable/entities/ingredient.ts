import { AirtableClient } from "../client";
import { type Ingredient, ingredientSchema } from "../schemas/ingredient";

export class IngredientEntity extends AirtableClient {
	public static async findPerPage(page: number, perPage: number) {
		const offset = page * perPage;

		return new Promise<Ingredient[]>((resolve) => {
			AirtableClient.db("Ingredients")
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

					const ingredients = records.map(
						(record) => ({
							id: record.id,
							...record.fields,
						}),
					);

					const parsedIngredients = ingredientSchema.array().parse(ingredients);
					resolve(parsedIngredients);
				});
		});
	}

	public static async create(ingredient: Omit<Ingredient, "id">) {
		return new Promise<Ingredient>((resolve) => {
			AirtableClient.db("Ingredients").create(
				[
					{
						fields: ingredient,
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

					const createdIngredient = {
						id: firstField.id,
						...firstField.fields,
					};

					const parsedIngredient = ingredientSchema.parse(createdIngredient);
					resolve(parsedIngredient);
				},
			);
		});
	}

	public static async update(id: string, ingredient: Partial<Omit<Ingredient, "id">>) {
		return new Promise<Ingredient>((resolve) => {
			AirtableClient.db("Ingredients").update(
				[
					{
						id: id,
						fields: ingredient,
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

					const updatedIngredient = {
						id: firstRecord.id,
						...firstRecord.fields,
					};

					const parsedIngredient = ingredientSchema.parse(updatedIngredient);
					resolve(parsedIngredient);
				},
			);
		});
	}

	public static async delete(id: string): Promise<boolean> {
		return new Promise<boolean>((resolve) => {
			AirtableClient
				.db("Ingredients")
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
