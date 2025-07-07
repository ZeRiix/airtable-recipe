import { Ingredient } from "@business/entities/ingredient";
import { ingredientConfigs } from "@interfaces/configs/ingredients";
import { airtableProvider } from "@interfaces/providers/airtable";

const { quantityPerPage } = ingredientConfigs.findMany;

useBuilder()
	.createRoute("POST", "/ingredient-list-page")
	.handler(
		async() => {
			const count = await airtableProvider.ingredientEntity
				.count(ingredientConfigs.findMany.quantityPerPage);

			return new OkHttpResponse(
				"ingredientList.pageInformation",
				{
					quantityPerPage,
					total: count,
				},
			);
		},
		makeResponseContract(OkHttpResponse, "ingredientList.pageInformation", Ingredient.listPage),
	);
