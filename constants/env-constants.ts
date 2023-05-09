import { EnvConstantsType } from "./env-constants.types";

export const EnvConstants: EnvConstantsType = {
  SERVER_PORT: Number(process.env.SERVER_PORT) || 4000,
  APP_ENV: process.env.APP_ENV || "error_env"
  // UPLOAD_LOCATION: process.env.UPLOAD_LOCATION || ""
};
