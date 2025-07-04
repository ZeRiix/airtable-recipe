/* eslint-disable @typescript-eslint/no-magic-numbers */
import { airtableProvider } from "@interfaces/providers/airtable";

const ingredientExistByIdCheck = createChecker(
	"ingredientExistById",
)
	.handler(
		async(ingredientId: string, output) => {
			const result = await airtableProvider.ingredientEntity
				.findOne(
					{
						ingredientId,
					},
				);

			if (result.code === 200) {
				return output(
					"ingredient.found",
					{
						...result.body.fields,
						id: result.body.id,
					},
				);
			}

			return output("ingredient.notfound", null);
		},
	);

export const iWantIngredientExistById = createPresetChecker(
	ingredientExistByIdCheck,
	{
		result: "ingredient.found",
		catch: () => new NotFoundHttpResponse("ingredient.notfound"),
		indexing: "ingredient",
	},
	makeResponseContract(NotFoundHttpResponse, "ingredient.notfound"),
);
