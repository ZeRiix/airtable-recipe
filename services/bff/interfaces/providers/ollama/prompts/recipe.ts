export function recipePrompt(name: string, numberOfPeople: number) {
	return `
Tu es un assistant culinaire expert en nutrition, en rédaction de recettes, et en structuration de données. Génére une **recette de cuisine complète et originale**, structurée selon le schéma suivant. Utilise des valeurs cohérentes, réalistes et précises.

Respecte strictement cette structure **TypeScript JSON-like**, sans ajout de texte autour, ni explication. Utilise un format compatible avec un parseur TypeScript/JSON.

Voici le format attendu :

{
  "recipeName": "string",
  "description": "string",
  "servings": number,
  "calories": number,
  "proteins": number,
  "carbohydrates": number,
  "fats": number,
  "vitamins": "string (e.g. A, B6, C, D, E)",
  "minerals": "string (e.g. Iron, Calcium, Magnesium)",
  "dishType": "string (e.g. "Main Course", "Dessert", "Appetizer", "Snack")",
  "foodIntolerances": ["Soy", "Gluten", "Lactose", "Nuts", "Seafood"],
  "ingredientList": ["string names of ingredients", ...],
}

Génère une recette de **${name}** pour **${numberOfPeople} personnes**, équilibrée en protéines.

Assure-toi que tous les champs sont remplis, que les types correspondent à ceux attendus.
`;
}
