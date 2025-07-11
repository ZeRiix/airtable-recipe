import { Duplo } from "@duplojs/core";
import { logger } from "@vendors/bakend-logger/logger";

export function debug() {
  return function (instance: Duplo) {
    if (instance.config.environment === "DEV") {
      instance.config.disabledZodAccelerator = true;
    }

    instance.hook("onError", (request, error) => {
      logger(`${request.method}:${request.path}`, error);
    });
  };
}
