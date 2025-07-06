import { Recipe } from "@business/entities/recipe";
import { recipeConfigs } from "@interfaces/configs/recipe";
import { mustBeConnectedRouteBuilder } from "@interfaces/http/security/mustBeConected";
import { airtableProvider } from "@interfaces/providers/airtable";

const { pageOffset, quantityPerPage } = recipeConfigs.findMany;

mustBeConnectedRouteBuilder()
	.createRoute("POST", "/recipe-find-many")
	.extract({
		body: {
			page: zod.number().min(pageOffset),
		},
	})
	.handler(
		async(pickup) => {
			const { page } = pickup(["page"]);

			const result = await airtableProvider.recipeEntity
				.findMany(
					{
						page: page - pageOffset,
						quantityPerPage,
					},
				);

			return new OkHttpResponse("recipeList.found", result);
		},
		makeResponseContract(OkHttpResponse, "recipeList.found", Recipe.list),
	);
