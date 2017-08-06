import { Option, Some, None } from '../src/index'

const positiveNumber = (input: number): Option<number> => {
  if (input > 0) {
    return new Some(input)
  } else {
    return new None<number>()
  }
}
interface Person {
  name: string,
  middleName?: string
}
const people: Person[] = [
  {
    name: 'NoMiddleName'
  },
  {
    name: 'HasMiddleName',
    middleName: 'MyMiddleName'
  }
]
const findPerson = (input: string): Option<Person> => {
  const result = people.find(p => p.name === input)
  if (result) {
    return new Some(result)
  } else {
    return new None<Person>()
  }
}
const getMiddleName = (person: Person): Option<string> => {
  if (person.middleName) {
    return new Some(person.middleName)
  } else {
    return new None<string>()
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
  describe("map", function () {
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

  describe("flatMap", function () {
    describe("None", function () {
      it("return None for a non-existing person", function () {
        const none = findPerson('DoesNotExist')
        const result = none.flatMap(getMiddleName)
        expect(result.isNone()).toBeTruthy()
      });

      it("does not call fn", function () {
        const none = findPerson('DoesNotExist')
        const result = none.flatMap((a) => {
          throw Error('none should not call fn')
        })
        expect(result.isNone()).toBeTruthy()
      });
    });

    describe("Some", function () {
      it("returns None when no middleName", function () {
        const some = findPerson('NoMiddleName')
        const result = some.flatMap(getMiddleName)
        expect(result.isSome()).toBeFalsy()
      });

      it("returns Some with middlename", function () {
        const some = findPerson('HasMiddleName')
        const result = some.flatMap(getMiddleName)
        expect(result.isSome()).toBeTruthy()
      });

      it("value returned is expected string", function () {
        const some = findPerson('HasMiddleName')
        const someMiddleName = some.flatMap(getMiddleName)
        let result = ''
        if (someMiddleName.isSome()) {
          result = someMiddleName.get()
        }
        expect(result).toEqual('MyMiddleName')
      });
    });
  });

});
