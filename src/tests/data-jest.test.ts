import { twoLinesDataPromise } from "../data/two-lines-data";

describe("Two lines table", () => {
  it("loads", () => {
    twoLinesDataPromise.then(
      (result) => {
        expect(result ? result.length : 0).toBe(10);
      },
      (error) => {
        throw new Error(error);
      }
    );
  });
});
