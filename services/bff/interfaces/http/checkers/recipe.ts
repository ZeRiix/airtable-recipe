/* eslint-disable @typescript-eslint/no-magic-numbers */
import { airtableProvider } from "@interfaces/providers/airtable";

const recipeExistByIdCheck = createChecker(
	"recipeExistById",
)
	.handler(
		async(recipeId: string, output) => {
			const result = await airtableProvider.recipeEntity
				.findOne(
					{
						recipeId,
					},
				);

			if (result.code === 200) {
				return output(
					"recipe.found",
					{
						...result.body.fields,
						id: result.body.id,
					},
				);
			}

			return output("recipe.notfound", null);
		},
	);

export const iWantRecipeExistById = createPresetChecker(
	recipeExistByIdCheck,
	{
		result: "recipe.found",
		catch: () => new NotFoundHttpResponse("recipe.notfound"),
		indexing: "recipe",
	},
	makeResponseContract(NotFoundHttpResponse, "recipe.notfound"),
);
