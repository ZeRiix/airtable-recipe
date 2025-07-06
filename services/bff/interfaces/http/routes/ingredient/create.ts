import { mineralEnumSchema } from "@business/entities/common/mineral";
import { vitaminEnumSchema } from "@business/entities/common/vitamin";
import { mustBeConnectedRouteBuilder } from "@interfaces/http/security/mustBeConected";
import { airtableProvider } from "@interfaces/providers/airtable";
import { ingredientRules } from "@vendors/entity-rules";

const {
	name, calories, proteins, carbohydrates, fats, minerals, nutritionalContent, vitamins,
} = ingredientRules;

mustBeConnectedRouteBuilder()
	.createRoute("POST", "/ingredient-create")
	.extract({
		body: zod.object({
			name: zod.string()
				.min(name.min)
				.max(name.max),
			nutritionalContent: zod.string()
				.min(nutritionalContent.min)
				.max(nutritionalContent.max),
			calories: zod.number()
				.min(calories.min)
				.max(calories.max),
			proteins: zod.number()
				.min(proteins.min)
				.max(proteins.max),
			carbohydrates: zod.number()
				.min(carbohydrates.min)
				.max(carbohydrates.max),
			fats: zod.number()
				.min(fats.min)
				.max(fats.max),
			vitaminList: vitaminEnumSchema.array()
				.max(vitamins.max),
			mineralList: mineralEnumSchema.array()
				.max(minerals.max),
			photoLink: zod.string().url(),
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
