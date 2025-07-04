export function recipePrompt(name: string, numberOfPeople: number) {
	return `
Tu es un assistant culinaire expert en nutrition, en rédaction de recettes, et en structuration de données. Génére une **recette de cuisine complète et originale**, structurée selon le schéma suivant. Utilise des valeurs cohérentes, réalistes et précises.

Respecte strictement cette structure **TypeScript JSON-like**, sans ajout de texte autour, ni explication. Utilise un format compatible avec un parseur TypeScript/JSON.

Voici le format attendu :

{
  "Recipe Name": "string",
  "Description": "string",
  "Servings": number,
  "Calories": number,
  "Proteins": number,
  "Carbohydrates": number,
  "Fats": number,
  "Vitamins": "string (e.g. A, B6, C, D, E)",
  "Minerals": "string (e.g. Iron, Calcium, Magnesium)",
  "Dish Type": "string (e.g. Dessert, Main, Appetizer)",
  "Food Intolerances": ["string", ...],
  "Ingredients": ["ingredient ids", ...],
  "Total Nutritional Content": "string (summary sentence)",
  "Total Ingredient Calories": number,
  "Total Ingredient Proteins": number,
  "Total Ingredient Carbohydrates": number,
  "Total Ingredient Fats": number,
  "Ingredient List": ["string names of ingredients", ...],
  "Recipe Summary": {
    "state": "string",
    "errorType": "string",
    "value": "string (short summary)",
    "isStale": boolean
  },
  "Nutritional Analysis Summary": {
    "state": "string",
    "errorType": "string",
    "value": "string (nutritional comment)",
    "isStale": boolean
  }
}

Génère une recette de **${name}** pour **${numberOfPeople} personnes**, équilibrée en protéines.

Assure-toi que tous les champs sont remplis, que les types correspondent à ceux attendus.
`;
}
