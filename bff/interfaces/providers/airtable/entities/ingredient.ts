import { AirtableClient } from "../client";
import { type Ingredient, ingredientSchema } from "../schemas/ingredient";

export class IngredientEntity extends AirtableClient {
	public static async getById(id: string) {
		return new Promise<Ingredient>((resolve) => {
			AirtableClient.db("Ingredients")
				.find(id, (err, record) => {
					if (err) {
						throw err instanceof Error
							? err
							: new Error(String(err));
					}

					if (!record) {
						throw Error("Ingredient does not exist");
					}

					const foundIngredient = {
						id: record.id,
						...record.fields,
					};

					const parsedIngredient = ingredientSchema.parse(foundIngredient);
					resolve(parsedIngredient);
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
}
