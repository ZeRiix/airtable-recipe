import { Ingredient } from "@business/entities/ingredient";
import { ingredientConfigs } from "@interfaces/configs/ingredients";
import { mustBeConnectedRouteBuilder } from "@interfaces/http/security/mustBeConected";
import { airtableProvider } from "@interfaces/providers/airtable";

mustBeConnectedRouteBuilder()
	.createRoute("POST", "/ingredient-find-many")
	.extract({
		body: zod.object({
			page: zod.number().min(
				ingredientConfigs.findMany.pageOffset,
			),
		}),
	})
	.cut(
		async({ pickup, dropper }) => {
			const { page } = pickup("body");

			const result = await airtableProvider.ingredientEntity
				.findMany(
					{
						quantityPerPage: ingredientConfigs.findMany.quantityPerPage,
						page: page - ingredientConfigs.findMany.pageOffset,
					},
				);

			return dropper({ ingredientList: result });
		},
		["ingredientList"],
	)
	.handler(
		(pickup) => {
			const { ingredientList } = pickup(["ingredientList"]);

			return new OkHttpResponse("ingredientList.found", ingredientList);
		},
		makeResponseContract(OkHttpResponse, "ingredientList.found", Ingredient.list),
	);
