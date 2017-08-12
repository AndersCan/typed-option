import { Option, Some, None } from '../src/index'

const positiveNumber = (input: number): Option<number> => {
  if (input > 0) {
    return new Some(input)
  } else {
    return None
  }
}
describe("Option - basic tests", function () {
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

  describe("Option.from", function () {
    it("returns None when given undefined", function () {
      const result = Option.from(undefined)
      expect(result.isNone()).toBeTruthy()
    });
    it("returns None when given a falsy value", function () {
      const falsyValues = [false, null, undefined, 0, NaN, '', ""]
      const options = falsyValues.map((o) => Option.from(o))
      const result = options.every((o) => o.isNone())
      expect(result).toBeTruthy()
    });
    it("returns Some when given a truthy value", function () {
      const truthyValues = [true, {}, -1, 1, 'A', "A"]
      const options = truthyValues.map((o) => Option.from(o))
      const result = options.every((o) => o.isSome())
      expect(result).toBeTruthy()
    });
  });

});
