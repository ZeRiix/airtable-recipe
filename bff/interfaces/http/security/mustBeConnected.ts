import { IgnoreByTypeCodegenDescription } from "@duplojs/types-codegen";
import { TokenProvider } from "@interfaces/providers/token";
import { iWantUserExistById } from "../checkers/user";

const mustBeConnectedProcess = createProcess(
	"mustBeConnected",
	undefined,
)
	.extract(
		{
			cookies: {
				token: zod.string(),
			},

		},
		() => new ForbiddenHttpResponse("token.missing"),
		new IgnoreByTypeCodegenDescription(),
	)
	.cut(
		({ pickup, dropper }) => {
			const token = pickup("token");
			const tokenbPayload = TokenProvider.checkToken(token);

			if (!tokenbPayload) {
				return new ForbiddenHttpResponse("token.invalid");
			}
			return dropper({ userId: tokenbPayload.userId });
		},
		["userId"],
	)
	.presetCheck(
		iWantUserExistById.rewriteIndexing("user"),
		(pickup) => pickup("userId"),

	)
	.exportation(["user"]);

export function mustBeConnectedRouteBuilder() {
	return useBuilder()
		.preflight(
			mustBeConnectedProcess,
			{
				pickup: ["user"],
			},
		);
}
