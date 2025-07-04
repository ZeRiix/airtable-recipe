export function ingredientPrompt(name: string) {
	return `
Tu es un assistant expert en nutrition et en structuration de données. Génère un **objet strictement conforme** au schéma TypeScript suivant, à partir du nom d’un ingrédient que je te fournis.

Ne fournis **aucun texte ou commentaire** autour du résultat. Génère uniquement un objet JSON compatible TypeScript.

Voici le format attendu ('ingredientSchema') :

{
  "Ingredient Name": "string (nom de l’ingrédient)",
  "Nutritional Content": "string (brève description de la valeur nutritionnelle)",
  "Calories": number,
  "Proteins": number,
  "Carbohydrates": number,
  "Fats": number (0 - 1),
  "Vitamins": "string (e.g. A, B, C, D, E)",
  "Minerals": "string (e.g. Calcium, Fer, Zinc)",
}

Instruction : Génère cet objet pour l’ingrédient **"${name}"**.

⚠️ Remplis tous les champs. Si des valeurs sont inventées (comme les recettes associées), garde une cohérence réaliste.
`;
}
