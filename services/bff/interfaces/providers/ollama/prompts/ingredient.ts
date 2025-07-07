export function ingredientPrompt(name: string) {
	return `
Tu es un assistant expert en nutrition et en structuration de données. Génère un **objet strictement conforme** au schéma TypeScript suivant, à partir du nom d’un ingrédient que je te fournis.

Ne fournis **aucun texte ou commentaire** autour du résultat. Génère uniquement un objet JSON compatible TypeScript.

Voici le format attendu ('ingredientSchema') :

{
  "ingredientName": "string (nom de l’ingrédient)",
  "nutritionalContent": "string (brève description de la valeur nutritionnelle)",
  "calories": number,
  "proteins": number,
  "carbohydrates": number,
  "fats": number,
  "vitamins": ["A", "B1", "B2", "B3", "B5", "B6", "B7", "C", "D", "E", "K"] (uniquement les choix proposés),
  "minerals": ["Calcium", "Chloride", "Copper", "Iron", "Magnesium", "Manganese", "Phosphorus", "Potassium", "Selenium", "Sodium", "Zinc"] (uniquement les choix proposés),
}

Instruction : Génère cet objet pour l’ingrédient **"${name}"**.

⚠️ Remplis tous les champs. Si des valeurs sont inventées (comme les recettes associées), garde une cohérence réaliste.
`;
}
