import { server } from "../server";
import { Compression } from "./configs/compression";
import { Cors } from "./configs/cors";
import { ExpressParser } from "./configs/express-parser";
import { Hpp } from "./configs/hpp";

export function InitMiddlewares() {
  Compression(server);
  Cors(server);
  ExpressParser(server);
  Hpp(server);
}
