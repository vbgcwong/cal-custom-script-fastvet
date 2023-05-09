import { server } from "../server";
import { postRouter } from "./post-routes";

export function InitRoutes() {
  server.use("/api/post", postRouter);
}
