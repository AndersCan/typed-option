import { Option, Some, None } from '../src/index'

const positiveNumber = (input: number): Option<number> => {
  if (input > 0) {
    return new Some(input)
  } else {
    return None
  }
}

describe('filter', function() {
  describe('none', function() {
    it('returns None', function() {
      const none = positiveNumber(-1)
      const result = none.filter(a => true)
      expect(result.isNone()).toBeTruthy()
    })
  })
  describe('some', function() {
    it('returns None with false predicate', function() {
      const some = positiveNumber(1)
      const result = some.filter(x => false)
      expect(result.isNone()).toBeTruthy()
    })
    it('returns Some with true predicate', function() {
      const some = positiveNumber(1)
      const result = some.filter(a => true)
      expect(result.isSome()).toBeTruthy()
    })
    it('returns Some with false predicate', function() {
      const some = positiveNumber(1)
      const result = some.filter(a => true)
      if (result.isSome()) {
        expect(result.get()).toEqual(1)
      }
    })
  })
})
