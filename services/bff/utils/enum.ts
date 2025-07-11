import { type SimplifyObjectTopLevel } from "@duplojs/utils";

export type Enum<
	GenericValues extends [string, ...string[]] = [string, ...string[]],
> = SimplifyObjectTopLevel<
	{
		[Prop in GenericValues[number]]: Prop
	} & {
		toTuple(): GenericValues;
		has(value: string): value is GenericValues[number];
	}
>;

export function createEnum<
	GenericValue extends string,
	GenericValues extends [GenericValue, ...GenericValue[]],
>(values: GenericValues): Enum<GenericValues> {
	return Object.fromEntries(
		[
			...values.map((value) => [value, value]),
			["toTuple", () => values],
			["has", (value: GenericValue) => values.includes(value)],
		],
	);
}

export type GetEnumValue<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	GenericEnum extends Enum<any>,
> = ReturnType<GenericEnum["toTuple"]>[number];
