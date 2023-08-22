import { EnvConstants } from "../../../constants/env-constants";
import * as dotenv from "dotenv";
dotenv.config();

describe("EnvConstants.SERVER_PORT unit test", () => {
  it("should have SERVER_PORT property", () => {
    expect(EnvConstants).toHaveProperty("SERVER_PORT");
  });

  it("should be port 6000", () => {
    expect(EnvConstants.SERVER_PORT).toEqual(6000);
  });
});

describe("EnvConstants.APP_ENV unit test", () => {
  it("should have APP_ENV property", () => {
    expect(EnvConstants).toHaveProperty("APP_ENV");
  });

  if (process.env.APP_ENV === "development") {
    it("should be APP_ENV of development on Dev machine", () => {
      expect(EnvConstants.APP_ENV).toEqual("development");
    });
  } else if (process.env.APP_ENV === "staging") {
    it("should be APP_ENV of staging on staging machine", () => {
      expect(EnvConstants.APP_ENV).toEqual("staging");
    });
  } else if (process.env.APP_ENV === "production") {
    it("should be APP_ENV of production on production machine", () => {
      expect(EnvConstants.APP_ENV).toEqual("production");
    });
  }
});

describe("EnvConstants.SERVER_URL unit test", () => {
  it("should have SERVER_URL property", () => {
    expect(EnvConstants).toHaveProperty("SERVER_URL");
  });

  it("should be localhost in development environment", () => {
    if (process.env.APP_ENV === "development") {
      expect(EnvConstants.SERVER_URL).toEqual("http://localhost");
    }
  });
});
