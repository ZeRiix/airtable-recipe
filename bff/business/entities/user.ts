import { zod } from "@duplojs/core";

export namespace User {
	export const index = zod.object({
		id: zod.string(),
		username: zod.string(),
		email: zod.string(),
		password: zod.string(),
	});
}
