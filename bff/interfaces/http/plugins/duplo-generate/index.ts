import { mineralEnumSchema } from "@business/entities/common/mineral";
import { vitaminEnumSchema } from "@business/entities/common/vitamin";
import { Ingredient } from "@business/entities/ingredient";
import { Recipe } from "@business/entities/recipe";
import "@duplojs/types-codegen";

Ingredient.index._identifier = "Ingredient";
Recipe.index._identifier = "Recipe";
vitaminEnumSchema._identifier = "Vitamin";
mineralEnumSchema._identifier = "Mineral";
Recipe.index.shape["Dish Type"]._identifier = "DishType";
Recipe.index.shape["Food Intolerances"].element._identifier = "Intolerance";
