import { mineralEnumSchema } from "@business/entities/common/mineral";
import { vitaminEnumSchema } from "@business/entities/common/vitamin";
import { mustBeConnectedRouteBuilder } from "@interfaces/http/security/mustBeConected";
import { airtableProvider } from "@interfaces/providers/airtable";

mustBeConnectedRouteBuilder()
	.createRoute("POST", "/ingredient-create")
	.extract({
		body: zod.object({
			name: zod.string(),
			nutritionalContent: zod.string(),
			calories: zod.number(),
			proteins: zod.number(),
			carbohydrates: zod.number(),
			fats: zod.number(),
			vitaminList: vitaminEnumSchema.array(),
			mineralList: mineralEnumSchema.array(),
			photoLink: zod.string().url().optional(),
		}),
	})
	.handler(
		async(pickup) => {
			const {
				name,
				nutritionalContent,
				calories,
				proteins,
				carbohydrates,
				fats,
				vitaminList,
				mineralList,
				photoLink,
			} = pickup("body");

			await airtableProvider.ingredientEntity
				.create({
					"Ingredient Name": name,
					"Nutritional Content": nutritionalContent,
					Calories: calories,
					Proteins: proteins,
					Carbohydrates: carbohydrates,
					Fats: fats,
					Vitamins: vitaminList.toString(),
					Minerals: mineralList.toString(),
					"Ingredient Photo": photoLink,
				});

			return new CreatedHttpResponse("ingredient.created");
		},
		makeResponseContract(CreatedHttpResponse, "ingredient.created"),
	);
