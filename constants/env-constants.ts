import { EnvConstantsType } from "./env-constants.types";

export const EnvConstants: EnvConstantsType = {
  APP_ENV: process.env.APP_ENV || "error_env",
  COMMIT_HASH: process.env.COMMIT_HASH || "Error getting commit hash",
  SERVER_PORT: Number(process.env.SERVER_PORT) || 5000,
  SERVER_URL: process.env.SERVER_URL || "Error URL"
};
