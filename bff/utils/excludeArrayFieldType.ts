export type ExcludeArrayFields<GenericValue> = {
	[
	KeyField in keyof GenericValue as GenericValue[KeyField] extends unknown[]
		? never
		: GenericValue[KeyField] extends unknown[] | undefined
			? never
			: KeyField
	]: GenericValue[KeyField];
};
