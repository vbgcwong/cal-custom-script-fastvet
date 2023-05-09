import cors from "cors";
import express from "express";
import { EnvConstants } from "../../constants/env-constants";
import { GeneralConstants } from "../../constants/general-constants";

export function Cors(server: express.Application): void {
  const origin = EnvConstants.APP_ENV === GeneralConstants.development ? "http://localhost:4000" : "";

  server.use(
    cors({
      origin: [origin]
    })
  );
}
