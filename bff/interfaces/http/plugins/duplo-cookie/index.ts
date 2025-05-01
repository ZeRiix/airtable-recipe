/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
	Request,
	Response,
	type Duplo,
	type CurrentRequestObject,
} from "@duplojs/core";
import cookie from "cookie";
import {
	signCookie,
	filterCookies,
} from "./utils";

declare module "@duplojs/core" {
	interface Request {
		cookies: Record<string, string | undefined>;
	}

	interface Response<Code, Information, Body> {
		cookie: Record<
			string,
			{
				value: string;
				params?: cookie.SerializeOptions;
			}
		>;
		setCookie(name: string, value: string, params?: cookie.SerializeOptions): this;
		dropCookie(name: string): this;
	}
}

Request.prototype.cookies = {};

Response.prototype.cookie = {};

Response.prototype.setCookie = function(name, value, params) {
	this.cookie[name] = {
		value,
		params,
	};
	return this;
};

Response.prototype.dropCookie = function(name) {
	this.cookie[name] = {
		value: "",
		params: {},
	};
	return this;
};

export function duploCookie(
	options: {
		secret?: string;
	} = {},
) {
	return function(instance: Duplo) {
		instance.hook("beforeRouteExecution", (req: CurrentRequestObject) => {
			if (req.headers.cookie) {
				if (options.secret) {
					req.cookies = filterCookies(
						cookie.parse(
							Array.isArray(req.headers.cookie)
								? req.headers.cookie.join("; ")
								: req.headers.cookie,
						),
						options.secret,
					);
				} else {
					req.cookies = cookie.parse(Array.isArray(req.headers.cookie)
						? req.headers.cookie.join("; ")
						: req.headers.cookie);
				}
			}
		});

		instance.hook("beforeSend", (_req: Request, res: Response<any, any, any>) => {
			if (Object.keys(res.cookie).length !== 0) {
				res.setHeader(
					"Set-Cookie",
					Object.entries(res.cookie).map(
						([name, content]) => cookie.serialize(
							name,
							options.secret
								? signCookie(content.value, options.secret)
								: content.value,
							{
								...content.params,
							},
						),
					),
				);
			}
		});
	};
}
