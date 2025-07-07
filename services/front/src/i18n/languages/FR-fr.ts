import { homePage } from "@/domains/edito/homePage/router";
import { notFoundPage } from "@/domains/edito/notFoundPage/router";
import { ingredientListPage } from "@/domains/ingredient/ingredientListPage/router";
import { ingredientDetailsPage } from "@/domains/ingredient/ingredientDetailsPage/router";
import { recipeListPage } from "@/domains/recipe/recipeListPage/router";
import { recipeDetailsPage } from "@/domains/recipe/recipeDetailsPage/router";
import { ingredientCreatePage } from "@/domains/ingredient/ingredientCreatePage/router";
import { recipeCreateWithAIPage } from "@/domains/recipe/recipeCreateWithAIPage/router";
import { profilPage } from "@/domains/user/profilPage/router";
import { loginPage } from "@/domains/auth/loginPage/router";
import { registerPage } from "@/domains/auth/registerPage/router";
import { recipeCreatePage } from "@/domains/recipe/recipeCreatePage/router";

export const FRfr = {
	page: {
		[homePage.name]: {
			hero: {
				title: "Recipes",
				subtitle: "Découvrez, créez et partagez vos recettes préférées",
			},
			features: {
				recipes: {
					manual: {
						title: "Création manuelle",
						description: "Créez vos recettes étape par étape avec notre interface intuitive",
					},
					ai: {
						title: "Génération par IA",
						description: "Laissez l'intelligence artificielle créer des recettes uniques pour vous",
					},
				},
				tracking: {
					title: "Suivi nutritionnel",
					description: "Analysez les valeurs nutritionnelles de vos recettes et ingrédients",
				},
			},
			quickActions: {
				title: "Actions rapides",
				description: "Accédez rapidement aux fonctionnalités principales",
				browse: {
					title: "Parcourir les recettes",
					description: "Explorez notre collection de recettes",
				},
				create: {
					title: "Créer une recette",
					description: "Générez une nouvelle recette avec l'IA",
				},
			},
		},
		[notFoundPage.name]: {
			title: "Page non trouvée",
			description: "Désolé, la page que vous recherchez n'existe pas.",
		},
		[ingredientListPage.name]: {
			title: "Liste des ingrédients",
			ingredientCount: "{count} ingrédients totals",
		},
		[ingredientDetailsPage.name]: {
			noImage: "Aucune image disponible",
			recipeStats: {
				title: "Statistiques des recettes",
				totalRecipes: "Total des recettes associées",
				avgCalories: "Calories moyennes",
				avgProteins: "Protéines moyennes",
				avgCarbohydrates: "Glucides moyens",
				avgFats: "Lipides moyens",
				avgCarbs: "Glucides moyens",
			},
			nutritional: {
				title: "Informations nutritionnelles",
				description: "Valeur nutritionnelle de l'ingrédient",
				calories: "Calories totales",
				proteins: "Protéines totales",
				carbohydrates: "Glucides totaux",
				fats: "Lipides totaux",
			},
			vitamins: {
				title: "Vitamines",
			},
			minerals: {
				title: "Minéraux",
			},
			nutritionalContent: {
				title: "Contenu nutritionnel",
			},
			totalRecipeNutritional: {
				title: "Valeur nutritionnelle totale des recettes",
				description: "Valeur nutritionnelle totale des recettes associées à cet ingrédient",
				calories: "Calories",
				proteins: "Protéines",
				carbohydrates: "Glucides",
				fats: "Lipides",
			},
		},
		[recipeListPage.name]: {
			title: "Liste des recettes",
			recipeCount: "{count} recettes trouvées",
		},
		[recipeDetailsPage.name]: {
			noImage: "Aucune image disponible",
			description: {
				title: "Description de la recette",
			},
			basicInfo: {
				title: "Informations de base",
				cuisine: "Cuisine",
				course: "Type de plat",
				diet: "Régime",
				method: "Méthode",
				prepTime: "Temps de préparation",
				cookTime: "Temps de cuisson",
				totalTime: "Temps total",
				servings: "Portions",
				yield: "Rendement",
				rating: "Note",
				dishType: "Type de plat",
				totalIngredients: "Ingrédients totaux",
			},
			intolerances: {
				title: "Intolérances",
			},
			nutritional: {
				title: "Informations nutritionnelles",
				description: "Valeur nutritionnelle de la recette",
				calories: "Calories totales",
				proteins: "Protéines totales",
				carbohydrates: "Glucides totaux",
				fats: "Lipides totaux",
			},
			vitamins: {
				title: "Vitamines",
			},
			minerals: {
				title: "Minéraux",
			},
			totalNutritionalContent: {
				title: "Contenu nutritionnel total",
			},
			ingredientNutritional: {
				title: "Valeur nutritionnelle des ingrédients",
				description: "Valeur nutritionnelle des ingrédients de la recette",
				calories: "Calories",
				proteins: "Protéines",
				carbohydrates: "Glucides",
				fats: "Lipides",
			},
			ingredientList: {
				title: "Ingrédients",
			},
		},
		[ingredientCreatePage.name]: {
			title: "Créer un ingrédient",
			description: "Créez un nouvel ingrédient pour enrichir votre base de données",
			form: {
				label: {
					name: "Nom de l'ingrédient",
					nutritionalContent: "Contenu nutritionnel",
					calories: "Calories (kcal)",
					proteins: "Protéines (g)",
					carbohydrates: "Glucides (g)",
					fats: "Lipides (g)",
					photoLink: "Image de l'ingrédient",
					vitamins: "Liste des vitamines",
					minerals: "Liste des minéraux",
				},
			},
		},
		[recipeCreatePage.name]: {
			title: "Créer une recette",
			description: "Créez une nouvelle recette pour enrichir votre base de données",
			form: {},
		},
		[recipeCreateWithAIPage.name]: {
			title: "Créer une recette avec l'IA",
			description: "Générez une recette unique en utilisant l'intelligence artificielle",
			form: {
				label: {
					name: "Nom de la recette",
					numberOfPeople: "Nombre de personnes",
					recipePhoto: "Photo de la recette",
				},
			},
			result: {
				title: "Recette créée avec succès !",
				description: "Votre recette a été générée par l'IA et est maintenant prête à être utilisée.",
				recipeName: "Nom de la recette",
				recipeDescription: "Description",
				ingredients: "Ingrédients",
				servings: "Portions",
				servingsUnit: "personnes",
				calories: "Calories",
				proteins: "Protéines",
				carbohydrates: "Glucides",
				fats: "Lipides",
				createAnother: "Créer une nouvelle recette",
			},
		},
		[profilPage.name]: {
			title: "Mon profil",
			description: "Gérez vos informations personnelles",
			userInfo: {
				title: "Informations utilisateur",
				description: "Vos informations de compte",
				username: "Nom d'utilisateur",
				email: "Adresse email",
			},
			logout: "Se déconnecter",
			loading: "Chargement...",
		},
		[loginPage.name]: {
			title: "Connexion",
			description: "Connectez-vous à votre compte",
			noAccount: "Vous n'avez pas de compte ?",
			form: {
				label: {
					email: "Adresse email",
					password: "Mot de passe",
				},
			},
		},
		[registerPage.name]: {
			title: "Inscription",
			description: "Créez votre compte",
			hasAccount: "Vous avez déjà un compte ?",
			form: {
				label: {
					username: "Nom d'utilisateur",
					password: "Mot de passe",
					email: "Adresse email",
				},
			},
		},
	},
	ingredientCard: {
		noImage: "Aucune image disponible",
		nutritional: {
			calories: "Calories",
			proteins: "Protéines",
			carbohydrates: "Glucides",
			fats: "Lipides",
		},
		relatedRecipes: "recettes associées",
	},
	recipeCard: {
		noImage: "Aucune image disponible",
		servings: "Personnes",
		nutritional: {
			calories: "Calories",
			proteins: "Protéines",
			carbohydrates: "Glucides",
			fats: "Lipides",
		},
		ingredients: "Ingrédients",
		ingredientsCount: "{count} ingrédients",
	},
	layout: {
		loader: {
			title: "Chargement en cours...",
			description: "Veuillez patienter.",
		},
		header: {
			nav: {
				ingredientList: "Ingrédients",
				recipeList: "Recettes",
				ingredientCreate: "Créer un ingrédient",
				recipeCreate: "Créer une recette",
				recipeCreateWithAI: "Créer une recette avec l'IA",
			},
			userMenu: {
				profil: "Mon compte",
				login: "Incription / Connexion",
			},
		},
		footer: {
			copyright: "Fait avec ❤️ ESGI 2025",
		},
	},
	formMessage: {
		required: "Champ obligatoire.",
		positive: "Doit être un nombre positif.",
		max: "Ne doit pas dépasser {value}.",
		min: "Doit faire au moins {value}.",
		maxLength: "Doit faire au plus {value} caractères.",
		minLength: "Doit faire au moins {value} caractères.",
		int: "Le nombre doit être un entier.",
	},
	cta: {
		seeMore: "Voir plus",
		use: "Utiliser",
		back: "Retour",
		start: "Commencer",
		submit: "Soumettre",
		search: "Rechercher",
		filter: "Filtrer",
		reset: "Réinitialiser",
		save: "Enregistrer",
		cancel: "Annuler",
		delete: "Supprimer",
		edit: "Modifier",
		add: "Ajouter",
		remove: "Retirer",
		close: "Fermer",
		open: "Ouvrir",
		next: "Suivant",
		previous: "Précédent",
		first: "Premier",
		last: "Dernier",
		login: "Se connecter",
		register: "S'inscrire",
	},
	responses: {
		ingredient: {
			notFound: "Aucun ingrédient trouvé.",
			created: "Ingrédient créé avec succès.",
		},
		recipe: {
			notFound: "Aucune recette trouvée.",
			createdWithAI: "Recette créée avec succès grâce à l'IA.",
			created: "Recette créée avec succès.",
		},
		user: {
			register: "Inscription réussie. Bienvenue !",
			login: "Connexion réussie. Bienvenue !",
			notFound: "Infomation d'identification invalide.",
			exist: "Un compte avec ces infomation d'identification existe déjà",
		},
	},
	common: {
		units: {
			gram: "g",
			kilogram: "kg",
			milliliter: "ml",
			liter: "l",
			minutes: "minutes",
			hours: "heures",
			pieces: "pièces",
			portions: "portions",
		},
		labels: {
			name: "Nom",
			description: "Description",
			image: "Image",
			category: "Catégorie",
			type: "Type",
			quantity: "Quantité",
			price: "Prix",
			rating: "Note",
			date: "Date",
			time: "Heure",
			status: "Statut",
		},
	},
};
