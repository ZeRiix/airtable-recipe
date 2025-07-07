import { Recipe } from "@business/entities/recipe";
import { recipeConfigs } from "@interfaces/configs/recipe";
import { airtableProvider } from "@interfaces/providers/airtable";

const { quantityPerPage } = recipeConfigs.findMany;

useBuilder()
	.createRoute("POST", "/recipe-list-page")
	.handler(
		async() => {
			const total = await airtableProvider.recipeEntity
				.count(recipeConfigs.findMany.quantityPerPage);

			return new OkHttpResponse(
				"recipeList.pageInformation",
				{
					total,
					quantityPerPage,
				},
			);
		},
		makeResponseContract(OkHttpResponse, "recipeList.pageInformation", Recipe.listPage),
	);
