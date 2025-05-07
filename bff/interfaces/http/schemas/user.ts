export const endpointUserRouteSchema = zod.object({
	id: zod.string(),
	username: zod.string(),
	email: zod.string().email(),
});
