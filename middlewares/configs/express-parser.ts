import express from "express";

export function ExpressParser(server: express.Application): void {
  server.use(express.json());
  server.use(
    express.urlencoded({
      extended: true
    })
  );
}
