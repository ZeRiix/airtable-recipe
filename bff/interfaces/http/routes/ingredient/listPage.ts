import { Ingredient } from "@business/entities/ingredient";
import { ingredientConfigs } from "@interfaces/configs/ingredients";
import { mustBeConnectedRouteBuilder } from "@interfaces/http/security/mustBeConected";
import { airtableProvider } from "@interfaces/providers/airtable";

mustBeConnectedRouteBuilder()
	.createRoute("POST", "/ingredient-list-page")
	.handler(
		async() => {
			const count = await airtableProvider.ingredientEntity
				.count(ingredientConfigs.findMany.quantityPerPage);

			return new OkHttpResponse(
				"ingredientList.pageInformation",
				{
					quantityPerPage: ingredientConfigs.findMany.quantityPerPage,
					total: count,
				},
			);
		},
		makeResponseContract(OkHttpResponse, "ingredientList.pageInformation", Ingredient.listPage),
	);
