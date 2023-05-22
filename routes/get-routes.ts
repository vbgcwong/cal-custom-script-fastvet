import express, { Router } from "express";
import { healthcheck } from "../controllers/healthcheck";

export const getRouter: Router = express.Router();

getRouter.get("/healthcheck", healthcheck);
