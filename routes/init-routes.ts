import { server } from "../server";
import { getRouter } from "./get-routes";
import { postRouter } from "./post-routes";

export function InitRoutes() {
  server.use("/api/post", postRouter);
  server.use("/api/get", getRouter);
}
