import { Recipe } from "@business/entities/recipe";
import { recipeConfigs } from "@interfaces/configs/recipe";
import { mustBeConnectedRouteBuilder } from "@interfaces/http/security/mustBeConected";
import { airtableProvider } from "@interfaces/providers/airtable";

mustBeConnectedRouteBuilder()
	.createRoute("POST", "/recipe-list-page")
	.handler(
		async() => {
			const total = await airtableProvider.recipeEntity
				.count(recipeConfigs.findMany.quantityPerPage);

			return new OkHttpResponse(
				"recipeList.pageInformation",
				{
					total,
					quantityPerPage: recipeConfigs.findMany.quantityPerPage,
				},
			);
		},
		makeResponseContract(OkHttpResponse, "recipeList.pageInformation", Recipe.listPage),
	);
