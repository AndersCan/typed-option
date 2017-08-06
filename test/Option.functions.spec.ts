import { Option, Some, None } from '../src/index'

const positiveNumber = (input: number): Option<number> => {
  if (input > 0) {
    return new Some(input)
  } else {
    return new None<number>()
  }
}
describe("Option - functions", function () {
  describe("Map", function () {
    describe("None", function () {
      it("map on None returns None ", function () {
        const none = positiveNumber(-1)
        const result = none.map((a) => "" + a)
        expect(result.isNone()).toBeTruthy()
      });

      it("map does not call fn", function () {
        const none = positiveNumber(-1)
        const result = none.map((a) => {
          throw Error('none should not call fn')
        })
        expect(result.isNone()).toBeTruthy()
      });
    });

    describe("Some", function () {
      it("map on Some returns Some", function () {
        const some = positiveNumber(1)
        const result = some.map((a) => a)
        expect(result.isSome()).toBeTruthy()
      });

      it("map applies fn to parameter", function () {
        const some = positiveNumber(1)
        const mapped = some.map((a) => "Mapped-" + a)
        let result = '';
        if (mapped.isSome()) {
          result = mapped.get()
        }
        expect(result).toEqual('Mapped-1')
      });
    });
  });
  describe("Map", function () {
    describe("None", function () {
      it("map on None returns None ", function () {
        const none = positiveNumber(-1)
        const result = none.map((a) => "" + a)
        expect(result.isNone()).toBeTruthy()
      });

      it("map does not call fn", function () {
        const none = positiveNumber(-1)
        const result = none.map((a) => {
          throw Error('none should not call fn')
        })
        expect(result.isNone()).toBeTruthy()
      });
    });

    describe("Some", function () {
      it("map on Some returns Some", function () {
        const some = positiveNumber(1)
        const result = some.map((a) => a)
        expect(result.isSome()).toBeTruthy()
      });

      it("map applies fn to parameter", function () {
        const some = positiveNumber(1)
        const mapped = some.map((a) => "Mapped-" + a)
        let result = '';
        if (mapped.isSome()) {
          result = mapped.get()
          mapped.map((a) => "Mapped-" + a)
        }
        expect(result).toEqual('Mapped-1')
      });
    });
  });
});
