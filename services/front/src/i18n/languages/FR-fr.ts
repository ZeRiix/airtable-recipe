import { homePage } from "@/domains/edito/homePage/router";
import { notFoundPage } from "@/domains/edito/notFoundPage/router";

export const FRfr = {
	page: {
		[homePage.name]: {

		},
		[notFoundPage.name]: {

		},
	},
	layout: {
		loader: {
			title: "Chargement en cours...",
			description: "Veuillez patienter.",
		},
		header: {
			nav: {
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
		backHome: "Retour à l'accueil",
		connection: "Inscription / Connexion",
		seeMore: "Voir plus",
		use: "Utiliser",
		back: "Retour",
		start: "Commencer",
		submit: "Soumettre",
	},
	responses: {},
};
