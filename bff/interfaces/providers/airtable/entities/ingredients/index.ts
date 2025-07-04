import { AirtableBaseClient } from "../../client";
import { type InputDeleteIngredient, type InputCreateIngredient, type InputFindManyIngredient, type InputFindOneIngredient } from "./types";

export class IngredientEntity extends AirtableBaseClient {
	private static async getRecords(pageSize: number, offset?: string) {
		return this.httpClient.get(
			"/Ingredients",
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

		const offset = await Array.from({ length: targetPage }, (__, index) => index)
			.reduce(async(offsetPromise) => {
				const currentOffset = await offsetPromise;
				const { body } = await this.getRecords(pageSize, currentOffset);
				return body.offset;
			}, Promise.resolve(undefined as string | undefined));

		if (!offset) {
			return [];
		}

		const { body } = await this.getRecords(pageSize, offset);
		return body.records.map((record) => ({
			...record.fields,
			id: record.id,
		}));
	}

	public static async findMany(input: InputFindManyIngredient) {
		const { page, quantityPerPage } = input;
		return this.navigateToPage(page, quantityPerPage);
	}

	public static async findOne(input: InputFindOneIngredient) {
		return this.httpClient.get(
			"/Ingredients/{ingredientId}",
			{
				params: input,
			},
		)
			.iWantExpectedResponse();
	}

	public static create(input: InputCreateIngredient) {
		return this.httpClient.post(
			"/Ingredients",
			{
				body: {
					records: [
						{
							fields: input,
						},
					],
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

	public static delete(input: InputDeleteIngredient) {
		return this.httpClient.delete(
			"/Ingredients/{ingredientId}",
			{
				params: input,
			},
		)
			.iWantCode("200");
	}
}
