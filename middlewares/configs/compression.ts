import compression from "compression";
import express from "express";

export function Compression(server: express.Application): void {
  server.use(compression());
}
