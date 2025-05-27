import { zod } from "@duplojs/core";

export const thumbnailSchema = zod.object({
	url: zod.string().url(),
	width: zod.number().int().positive(),
	height: zod.number().int().positive(),
});

export const photoSchema = zod.object({
	id: zod.string(),
	width: zod.number().int().positive(),
	height: zod.number().int().positive(),
	url: zod.string().url(),
	filename: zod.string(),
	size: zod.number().int().positive(),
	type: zod.string(),
	thumbnails: zod.object({
		small: thumbnailSchema,
		large: thumbnailSchema,
		full: thumbnailSchema,
	}),
});
