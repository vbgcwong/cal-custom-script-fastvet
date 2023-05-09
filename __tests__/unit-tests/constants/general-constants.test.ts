import path from "path";
import { GeneralConstants } from "../../../constants/general-constants";

describe("GeneralConstants.uploadLocation unit test", () => {
  it("should return correct upload folder location", () => {
    const expectedFolderLocation = path.resolve(__dirname, "../../../uploads");
    expect(GeneralConstants.uploadLocation).toEqual(expectedFolderLocation);
  });

  it("should return development unit test", () => {
    expect(GeneralConstants.development).toBe("development");
  });

  it("should return staging unit test", () => {
    expect(GeneralConstants.staging).toBe("staging");
  });

  it("should return production unit test", () => {
    expect(GeneralConstants.production).toBe("production");
  });
});
