import { zod } from "@duplojs/core";
import { createEnum, type GetEnumValue } from "@utils/enum";

export const mineralEnum = createEnum([
	"Calcium",
	"Chloride",
	"Copper",
	"Iron",
	"Magnesium",
	"Manganese",
	"Phosphorus",
	"Potassium",
	"Selenium",
	"Sodium",
	"Zinc",
]);

export const mineralEnumSchema = zod.enum(mineralEnum.toTuple());

export type MineralEnum = GetEnumValue<typeof mineralEnum>;
