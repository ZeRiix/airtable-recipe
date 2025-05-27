/* eslint-disable */
/* prettier-ignore */
/* istanbul ignore file */
/* v8 ignore start */
// noinspection JSUnusedGlobalSymbols
// @ts-nocheck

type SuportedModel = "phi4-mini" | string;

type Message = {
	role: "user" | "system" | "assistant";
	content: string;
}

interface OllamaOptions {
	/**
	 * Contrôle la randomisation des réponses (0 = déterministe, valeurs plus hautes = plus créatif)
	 * Valeurs recommandées: entre 0 et 2
	 */
	temperature?: number;
	
	/**
	 * Limite la sélection des tokens aux k plus probables
	 * Doit être un entier positif
	 */
	top_k?: number;
	
	/**
	 * Limite la sélection aux tokens dont la probabilité cumulée atteint p%
	 * Valeurs entre 0 et 1
	 */
	top_p?: number;
	
	/**
	 * Nombre maximum de tokens à générer
	 * Doit être un entier positif
	 */
	max_tokens?: number;
	
	/**
	 * Pénalité pour la répétition de tokens (1 = neutre, >1 = pénalise davantage)
	 * Valeur minimale: 0
	 */
	repeat_penalty?: number;
	
	/**
	 * Nombre de tokens à considérer pour la pénalité de répétition
	 * Doit être un entier non négatif
	 */
	repeat_last_n?: number;
	
	/**
	 * Valeur d'initialisation pour les opérations aléatoires, permet la reproductibilité
	 * Doit être un entier
	 */
	seed?: number;
	
	/**
	 * Taille du contexte en nombre de tokens
	 * Doit être un entier positif
	 */
	num_ctx?: number;
	
	/**
	 * Nombre de GPU à utiliser
	 * Doit être un entier non négatif
	 */
	num_gpu?: number;
	
	/**
	 * Nombre de threads CPU à utiliser
	 * Doit être un entier positif
	 */
	num_thread?: number;
	
	/**
	 * Algorithme de régulation de l'entropie
	 * 0=désactivé, 1=Mirostat, 2=Mirostat 2.0
	 */
	mirostat?: 0 | 1 | 2;

	/**
	 * Taux d'apprentissage pour Mirostat
	 * Doit être un nombre positif
	 */
	mirostat_eta?: number;
	
	/**
	 * Cible d'entropie pour Mirostat
	 * Doit être un nombre positif
	 */
	mirostat_tau?: number;
	
	/**
	 * Séquence(s) qui arrête(nt) la génération
	 * Peut être une chaîne unique ou un tableau de chaînes
	 */
	stop?: string | string[];
}

type  OllamaRoutes =
	| ({
		method: "POST";
		path: "/api/generate";
		body: {
			model: SuportedModel;
			prompt: string;
			system?: string;
			context?: number[];
			template?: string;
			options?: OllamaOptions;
			stream: boolean;
			format: "json";
			raw?: boolean;
			keep_alive?: string;
		};
		response:
		| {
			code: 200;
			information: undefined;
			body: {
				model: string;
				created_at: string;
				response: string;
				done: boolean;
				context: number[];
				total_duration: number;
				load_duration: number;
				prompt_eval_count: number;
				prompt_eval_duration: number;
				eval_count: number;
				eval_duration: number;
			};
		}
		| {
			code: 400;
			information: undefined;
			body?: undefined;
		};
	})
	| ({
		method: "POST";
		path: "/api/chat";
		body: {
			model: SuportedModel;
			messages: Message[];
			stream?: boolean;
			format?: "json";
			keep_alive?: string;
			options?: OllamaOptions;
			template?: string;
			context?: number[];
		};
		response:
		| {
			code: 200;
			information: undefined;
			body: {
				model: string;
				created_at: string;
				message: {
					role: "assistant";
					content: string;
				};
				done: boolean;
				context: number[];
				total_duration: number;
				load_duration: number;
				prompt_eval_count: number;
				prompt_eval_duration: number;
				eval_count: number;
				eval_duration: number;
			};
		}
		| {
			code: 400;
			information: undefined;
			body?: undefined;
		};
	})
	| ({
		method: "GET";
		path: "/api/tags";
		body?: undefined;
		response: {
			code: 200;
			information: undefined;
			body: {
				models: {
					details?: Record<string, any>
					name: string;
					modified_at: string;
					size: number;
					model: string;
				}[];
			};
		};
	})
	| ({
		method: "POST";
		path: "/api/pull";
		body: {
			name: string;
			stream?: boolean;
		};
		response:
		| {
			code: 200;
			information: undefined;
			body: {
				status: string;
			};
		}
		| {
			code: 404;
			information: undefined;
			body?: undefined;
		};
	})
	| ({
		method: "POST";
		path: "/api/create";
		body: {
			name: string;
			modelfile: string;
			stream?: boolean;
		};
		response: {
			code: 200;
			information: undefined;
			body: {
				status: string;
			};
		};
	});

export { OllamaRoutes, SuportedModel, Message };
/* v8 ignore stop */