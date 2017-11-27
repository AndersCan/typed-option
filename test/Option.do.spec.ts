import { Option, Some, None } from '../src/index'

const parseIntOption = (v: string): Option<number> => {
  const result = Number.parseInt(v)
  if (Number.isNaN(result)) {
    return None
  } else {
    return new Some(result)
  }
}

describe('Option - do', function() {
  it('Sompe - do does not change content ', function() {
    const some: Option<number> = parseIntOption('1')
    some
      .do(n => n)
      .do(n => n)
      .do(n => n)
    expect(some.getOrElse(999)).toEqual(1)
  })
  it('Some - fn is called', function() {
    const some: Option<number> = parseIntOption('1')
    let result = 0
    some.do(n => (result = n))
    expect(result).toEqual(1)
  })
  it('None - does nothing', function() {
    const none: Option<number> = parseIntOption('abc')
    let result = 0
    none.do(n => {
      throw new Error('should not be called')
    })
    expect(none.getOrElse(999)).toEqual(999)
  })
})
