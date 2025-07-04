import { AirtableBaseClient } from "../../client";
import { type InputDeleteRecipe, type InputCreateRecipe, type InputFindManyRecipe, type InputFindOneRecipe } from "./types";

export class RecipeEntity extends AirtableBaseClient {
	private static async getRecords(pageSize: number, offset?: string) {
		return this.httpClient.get(
			"/Recipes",
			{
				query: {
					pageSize,
					...(offset && { offset }),
				},
			},
		).iWantCode("200");
	}

	private static async navigateToPage(targetPage: number, pageSize: number) {
		if (!targetPage) {
			const { body } = await this.getRecords(pageSize);
			return body.records.map((record) => ({
				...record.fields,
				id: record.id,
			}));
		}

		let currentOffset: string | undefined = undefined;

		for (let index = 0; index < targetPage; index++) {
			const { body } = await this.getRecords(pageSize, currentOffset);

			if (!body.offset) {
				return [];
			}

			currentOffset = body.offset;
		}

		const { body } = await this.getRecords(pageSize, currentOffset);
		return body.records.map((record) => ({
			...record.fields,
			id: record.id,
		}));
	}

	public static async findMany(input: InputFindManyRecipe) {
		const { page, quantityPerPage } = input;
		return this.navigateToPage(page, quantityPerPage);
	}

	public static async findOne(input: InputFindOneRecipe) {
		return this.httpClient.get(
			"/Recipes/{recipeId}",
			{
				params: input,
			},
		)
			.iWantExpectedResponse();
	}

	public static create(input: InputCreateRecipe) {
		return this.httpClient.post(
			"/Recipe",
			{
				body: {
					records: {
						fields: input,
					},
				},
			},
		)
			.iWantCode("200");
	}

	public static async count(pageSize: number) {
		let count = 0;
		let offset: string | undefined = undefined;

		do {
			const { body } = await this.getRecords(pageSize, offset);
			count += body.records.length;
			offset = body.offset;
		} while (offset);

		return count;
	}

	public static delete(input: InputDeleteRecipe) {
		return this.httpClient.delete(
			"/Recipes/{recipeId}",
			{
				params: input,
			},
		)
			.iWantCode("200");
	}
}
