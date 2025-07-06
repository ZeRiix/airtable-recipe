import { zod } from "@duplojs/core";
import { createEnum, type GetEnumValue } from "@utils/enum";

export const vitaminEnum = createEnum([
	"A",
	"B1",
	"B2",
	"B3",
	"B5",
	"B6",
	"B7",
	"C",
	"D",
	"E",
	"K",
]);

export const vitaminEnumSchema = zod.enum(vitaminEnum.toTuple());

export type VitaminEnum = GetEnumValue<typeof vitaminEnum>;
