import { ZodAccelerator } from "@duplojs/core";
import { envs } from "@interfaces/envs";
import jwt from "jsonwebtoken";

const { JWT_SECRET, JWT_TIME } = envs;

const payloadSchema = zod.object({
	userId: zod.string(),
	username: zod.string(),
	email: zod.string(),
});
export type Payload = Zod.infer<typeof payloadSchema>;

export class TokenProvider {
	private static payloadOptimizedSchema = ZodAccelerator.build(payloadSchema);

	public static generate(payload: Payload) {
		return jwt.sign(
			payload,
			JWT_SECRET,
			{ expiresIn: JWT_TIME },
		);
	}

	public static check(token: string) {
		try {
			const payload = jwt.verify(
				token,
				JWT_SECRET,
			);

			return TokenProvider.payloadOptimizedSchema.parse(payload);
		} catch {
			return null;
		}
	}
}
