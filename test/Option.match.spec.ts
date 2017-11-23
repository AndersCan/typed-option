import { Option, Some, None } from '../src/index'

const parseIntOption = (v: string): Option<number> => {
  const result = Number.parseInt(v)
  if (Number.isNaN(result)) {
    return None
  } else {
    return new Some(result)
  }
}

describe('Option - match', function() {
  describe('functions', function() {
    it('returns some', function() {
      const some = parseIntOption('1000')
      const result = some.match({
        none: () => 'none',
        some: () => 'some'
      })
      expect(result).toEqual('some')
    })
    it('return none', function() {
      const some = parseIntOption('text')
      const result = some.match({
        none: () => 'none',
        some: () => 'some'
      })
      expect(result).toEqual('none')
    })
  })

  describe('constants', function() {
    it('returns some', function() {
      const some = parseIntOption('1000')
      const result = some.match({
        none: 'none',
        some: 'some'
      })
      expect(result).toEqual('some')
    })
    it('return none', function() {
      const some = parseIntOption('text')
      const result = some.match({
        none: 'none',
        some: 'some'
      })
      expect(result).toEqual('none')
    })
  })

  describe('hybrids - functions and constants', function() {
    it('fn - returns some', function() {
      const some = parseIntOption('1000')
      const result = some.match({
        none: 'none',
        some: () => 'some'
      })
      expect(result).toEqual('some')
    })
    it('fn - return none', function() {
      const none = parseIntOption('text')
      const result = none.match({
        none: 'none',
        some: () => 'some'
      })
      expect(result).toEqual('none')
    })
    it('fn - return none', function() {
      const some = parseIntOption('text')
      const result = some.match({
        none: () => 'none',
        some: 'some'
      })
      expect(result).toEqual('none')
    })
    it('fn - return none', function() {
      const some = parseIntOption('text')
      const result = some.match({
        none: 'none',
        some: () => 'some'
      })
      expect(result).toEqual('none')
    })
  })
  describe('can return different types', function() {
    it('return a some', function() {
      const some = parseIntOption('1000')
      const result = some.match({
        none: () => 'none',
        some: () => 123
      })
      expect(result).toEqual(123)
    })
    it('returns a none', function() {
      const none = parseIntOption('text')
      const result = none.match({
        none: 123,
        some: () => 'some'
      })
      expect(result).toEqual(123)
    })
  })
})
