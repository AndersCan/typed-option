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
describe('Option - Some - functions', function() {
  describe('Map', function() {
    it('map on Some returns Some', function() {
      const some = positiveNumber(1)
      const result = some.map(a => a)
      expect(result.isSome()).toBeTruthy()
    })

    it('map applies fn to parameter', function() {
      const some = positiveNumber(1)
      const mapped = some.map(a => 'Mapped-' + a)
      let result = ''
      if (mapped.isSome()) {
        result = mapped.get()
      }
      expect(result).toEqual('Mapped-1')
    })
    it('map can return false', function() {
      const some = positiveNumber(1)
      const mapped = some.map(a => false)
      let result = true
      if (mapped.isSome()) {
        result = mapped.get()
      }
      expect(result).toEqual(false)
    })
    it('map can return {}', function() {
      const option = Option.from({})
      const result = option.map(_ => _)
      expect(result.isSome()).toEqual(true)
    })
    it('map can return all falsy values', function() {
      const some = positiveNumber(1)
      const mapped = some
        .map(a => false)
        .map(a => 0)
        .map(a => '')
        .map(a => ({}))
        .map(a => false)
      let result = true
      if (mapped.isSome()) {
        result = mapped.get()
      }
      expect(result).toEqual(false)
    })
  })

  describe('flatMap', function() {
    it('returns None when no middleName', function() {
      const some = findPerson('NoMiddleName')
      const result = some.flatMap(getMiddleName)
      expect(result.isSome()).toBeFalsy()
    })

    it('returns Some with middlename', function() {
      const some = findPerson('HasMiddleName')
      const result = some.flatMap(getMiddleName)
      expect(result.isSome()).toBeTruthy()
    })

    it('value returned is expected string', function() {
      const some = findPerson('HasMiddleName')
      const someMiddleName = some.flatMap(getMiddleName)
      let result = ''
      if (someMiddleName.isSome()) {
        result = someMiddleName.get()
      }
      expect(result).toEqual('MyMiddleName')
    })
  })

  describe('getOrElse', function() {
    it("does not return 'else' value", function() {
      const some = positiveNumber(1)
      const result = some.getOrElse(() => -999)
      expect(result).toEqual(1)
    })
    it("does not return 'else' value", function() {
      const some = positiveNumber(1)
      const result = some.getOrElse(() => -999)
      expect(result).toEqual(1)
    })
    it("does not call 'else' function", function() {
      const some = positiveNumber(1)
      const result = some.getOrElse(() => {
        throw Error('none should not call fn')
      })
      expect(result).toEqual(1)
    })
    it('can return other constant type', function() {
      const some = positiveNumber(1)
      const result = some.getOrElse('text')
      expect(result).toEqual(1)
    })
    it('can return other fn types', function() {
      const some = positiveNumber(1)
      const result = some.getOrElse(() => 'text')
      expect(result).toEqual(1)
    })
  })

  describe('orElse', function() {
    it("does not return 'else' value", function() {
      const some = positiveNumber(1)
      const result = some.orElse(() => positiveNumber(-1))
      expect(result.isSome()).toBeTruthy()
    })
    it('returns correct value', function() {
      const some = positiveNumber(1)
      const result = some.orElse(() => positiveNumber(-1))
      if (result.isSome()) {
        expect(result.get()).toEqual(1)
      }
    })
    it('can return other fn type', function() {
      const some = positiveNumber(1)
      const result = some.orElse(() => Option.from('text'))
      expect(result.getOrElse(() => -1)).toEqual(1)
    })
    it('can return other constant type', function() {
      const some = positiveNumber(1)
      const result = some.orElse(Option.from('text'))
      expect(result.getOrElse(() => -1)).toEqual(1)
    })
  })
})
