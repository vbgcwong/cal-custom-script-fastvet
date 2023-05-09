import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { EnvConstants } from "./constants/env-constants";
import { InitMiddlewares } from "./middlewares/init-middlewares";
import { InitRoutes } from "./routes/init-routes";

export const server: express.Application = express();

InitMiddlewares();
InitRoutes();

server.listen(EnvConstants.SERVER_PORT, () => console.log(`Server is running on port ${EnvConstants.SERVER_PORT}...`));
