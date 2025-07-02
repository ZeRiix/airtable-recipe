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
  "Fats": number,
  "Vitamins": "string (e.g. A, B, C, D, E)",
  "Minerals": "string (e.g. Calcium, Fer, Zinc)",
  "Total Calories in Recipes": number,
  "Total Proteins in Recipes": number,
  "Total Carbohydrates in Recipes": number,
  "Total Fats in Recipes": number,
  "Number of Recipes Using Ingredient": number,
  "Average Calories per Recipe": number,
  "Average Proteins per Recipe": number,
  "Average Carbohydrates per Recipe": number,
  "Average Fats per Recipe": number
}

Instruction : Génère cet objet pour l’ingrédient **"${name}"**.

⚠️ Remplis tous les champs. Si des valeurs sont inventées (comme les recettes associées), garde une cohérence réaliste.
Utilise des URLs fictives mais bien formatées pour les photos.
`;
}
