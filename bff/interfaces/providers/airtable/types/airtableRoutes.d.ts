// Handwritten by a son of a bitch
/* eslint-disable */
/* prettier-ignore */
/* istanbul ignore file */
/* v8 ignore start */
// noinspection JSUnusedGlobalSymbols
// @ts-nocheck

import { Ingredient } from "@business/entities/ingredient";
import { Recipe } from "@business/entities/recipe";
import { ExcludeArrayFields } from "@utils/excludeArrayFieldType";

interface AirtableBaseOutput<Fields> {
	id: string;
	createdTime: string;
	fields: Fields;
}

type AirtableRoutes = ({
    method: "GET";
    path: "/Ingredients";
    query: {
		offset?: string;
		maxRecords?: number;
		fields?: (keyof ExcludeArrayFields<Ingredient.Index>)[];
		filterByFormula?: string;
		pageSize?: number;
		sort?: string[];
	};
	response:
			| {
				code: 200;
				information: undefined;
				body: {
					offset?: string;
					records: AirtableBaseOutput<Ingredient.Index>[];
				};
				ok: true;
			}
}) | ({
	method: "GET";
    path: "/Ingredients/{ingredientId}";
	params: {
		ingredientId: Ingredient.Index["id"];
	};
	response:
			| {
				code: 200;
				information: undefined;
				body: AirtableBaseOutput<Ingredient.Index>;
				ok: true;
			}
			| {
				code: 404;
				information: undefined;
				body: {
					error: 'NOT_FOUND'
				};
				ok: false;
        	}
}) | ({
	method: "POST";
	path: "/Ingredients";
	body: {
		records: {
			fields: {
				"Ingredient Name": string;
				"Nutritional Content": string;
				Calories: number;
				Proteins: number;
				Carbohydrates: number;
				Fats: number;
				Vitamins: string;
				Minerals: string;
				"Ingredient Photo": string | undefined;
			};
		}[];
	};
	response:
			| {
				code: 200;
				information: undefined;
				body: {
					records: AirtableBaseOutput<Ingredient.Index>[];
				};
				ok: true;
			}
}) | ({
    method: "DELETE";
    path: "/Ingredients/{ingredientId}";
    params: {
        ingredientId: Ingredient.Index["id"];
    };
    response:
        | {
            code: 200;
            information: undefined;
            body: {
                deleted: boolean;
                id: string;
            };
            ok: true;
        }
        | {
            code: 404;
            information: undefined;
            body: {
                error: {
                    type: string;
                    message: string;
                };
            };
            ok: false;
        }
}) | ({
    method: "GET";
    path: "/Recipes";
    query: {
		offset?: string;
		maxRecords?: number;
		fields?: (keyof ExcludeArrayFields<Recipe.Index>)[];
		filterByFormula?: string;
		pageSize?: number;
		sort?: string[];
	};
	response:
			| {
				code: 200;
				information: undefined;
				body: {
					offset?: string;
					records: AirtableBaseOutput<Recipe.Index>[];
				};
				ok: true;
			}
}) | ({
	method: "GET";
    path: "/Recipes/{recipeId}";
	params: {
		recipeId: Recipe.Index["id"];
	};
	response:
			| {
				code: 200;
				information: undefined;
				body: AirtableBaseOutput<Recipe.Index>;
				ok: true;
			}
			| {
				code: 404;
				information: undefined;
				body: {
					error: 'NOT_FOUND'
				};
				ok: false;
        	}
}) | ({
	method: "POST";
	path: "/Recipes";
	body: {
		records: {
			fields: Omit<
				Recipe.Index, 
				"id" | "createdAt" | "Total Nutritional Content" | "Total Ingredient Calories" | "Total Ingredient Proteins" | "Total Ingredient Carbohydrates" | "Total Ingredient Fats" | "Ingredient List" | "Recipe Summary" | "Nutritional Analysis Summary"
				>;
		}[];
	};
	response:
			| {
				code: 200;
				information: undefined;
				body: {
					records: AirtableBaseOutput<Recipe.Index>[];
				};
				ok: true;
			}
}) | ({
    method: "DELETE";
    path: "/Recipes/{recipeId}";
    params: {
        recipeId: Recipe.Index["id"];
    };
    response:
        | {
            code: 200;
            information: undefined;
            body: {
                deleted: boolean;
                id: string;
            };
            ok: true;
        }
        | {
            code: 404;
            information: undefined;
            body: {
                error: {
                    type: string;
                    message: string;
                };
            };
            ok: false;
        }
});

export { AirtableRoutes }
/* v8 ignore stop */