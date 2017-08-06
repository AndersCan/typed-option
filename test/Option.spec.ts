import { Option, Some, None } from '../src/index'

const positiveNumber = (input: number): Option<number> => {
  if (input > 0) {
    return new Some(input)
  } else {
    return new None<number>()
  }
}
describe("Option - simple tests", function () {
  describe("Some", () => {

    it("isSome === true", function () {
      const some = positiveNumber(1)
      expect(some.isSome()).toBeTruthy()
    });

    it("isNone === false", function () {
      const some = positiveNumber(1)
      expect(some.isNone()).toBeFalsy()
    });

    it("a value is returned", function () {
      const some = positiveNumber(1)
      let result = -1
      if (some.isSome()) {
        result = some.get()
      }
      expect(result).toEqual(1)
    });

  });

  describe("None", () => {
    it("isSome === false", function () {
      const none = positiveNumber(-1)
      expect(none.isSome()).toBeFalsy()
    });

    it("isNone === true", function () {
      const none = positiveNumber(-1)
      expect(none.isNone()).toBeTruthy()
    });

    it("None has no get function ", function () {
      const none = positiveNumber(-1)
      expect(none['get']).toBeFalsy()
    });
  })
});