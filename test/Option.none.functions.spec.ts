import { Option, Some, None } from '../src/index'

const positiveNumber = (input: number): Option<number> => {
  if (input > 0) {
    return new Some(input)
  } else {
    return None
  }
}
interface Person {
  name: string
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
    return None
  }
}
const getMiddleName = (person: Person): Option<string> => {
  if (person.middleName) {
    return new Some(person.middleName)
  } else {
    return None
  }
}
describe('Option - None - functions', function() {
  describe('Map', function() {
    it('map on None returns None ', function() {
      const none = positiveNumber(-1)
      const result = none.map(a => '' + a)
      expect(result.isNone()).toBeTruthy()
    })

    it('map does not call fn', function() {
      const none = positiveNumber(-1)
      const result = none.map(a => {
        throw Error('none should not call fn')
      })
      expect(result.isNone()).toBeTruthy()
    })
  })

  describe('flatMap', function() {
    it('return None for a non-existing person', function() {
      const none = findPerson('DoesNotExist')
      const result = none.flatMap(getMiddleName)
      expect(result.isNone()).toBeTruthy()
    })

    it('does not call fn', function() {
      const none = findPerson('DoesNotExist')
      const result = none.flatMap(a => {
        throw Error('none should not call fn')
      })
      expect(result.isNone()).toBeTruthy()
    })
  })

  describe('getOrElse', function() {
    it("returns 'else' value", function() {
      const none = positiveNumber(-1)
      const result = none.getOrElse(() => 100)
      expect(result).toEqual(100)
    })
    it('can return other constant type', function() {
      const none = positiveNumber(-1)
      const result = none.getOrElse('text')
      expect(result).toEqual('text')
    })
    it('can return other fn types', function() {
      const none = positiveNumber(-1)
      const result = none.getOrElse(() => 'text')
      expect(result).toEqual('text')
    })
  })

  describe('orElse', function() {
    it("returns 'orElse' value", function() {
      const none = positiveNumber(-1)
      const result = none.orElse(() => positiveNumber(1))
      expect(result.isSome()).toBeTruthy()
    })
    it("returns correct 'orElse' value", function() {
      const none = positiveNumber(-1)
      const result = none.orElse(() => positiveNumber(1))
      expect(result.getOrElse(() => -1)).toEqual(1)
    })
    it('can return other fn type', function() {
      const none = positiveNumber(-1)
      const result = none.orElse(() => Option.from('text'))
      expect(result.getOrElse(() => -1)).toEqual('text')
    })
    it('can return other constant type', function() {
      const none = positiveNumber(-1)
      const result = none.orElse(Option.from('text'))
      expect(result.getOrElse(() => -1)).toEqual('text')
    })
  })
})
