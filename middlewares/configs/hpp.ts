import express from "express";
import hpp from "hpp";

export function Hpp(server: express.Application): void {
  // protect against HTTP Parameter Pollution attacks
  server.use(hpp());
}
