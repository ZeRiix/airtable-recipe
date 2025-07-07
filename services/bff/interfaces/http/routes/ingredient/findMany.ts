import { Ingredient } from "@business/entities/ingredient";
import { ingredientConfigs } from "@interfaces/configs/ingredients";
import { airtableProvider } from "@interfaces/providers/airtable";

const { pageOffset, quantityPerPage } = ingredientConfigs.findMany;

useBuilder()
	.createRoute("POST", "/ingredient-find-many")
	.extract({
		body: zod.object({
			page: zod.number().min(pageOffset),
		}),
	})
	.cut(
		async({ pickup, dropper }) => {
			const { page } = pickup("body");

			const result = await airtableProvider.ingredientEntity
				.findMany(
					{
						quantityPerPage,
						page: page - pageOffset,
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
