import { Option, Some, None } from '../src/index'

const parseIntOption = (v: string): Option<number> => {
  const result = Number.parseInt(v)
  if (Number.isNaN(result)) {
    return None
  } else {
    return new Some(result)
  }
}

describe('Option - combine', function() {
  it('Some - returns correct string', function() {
    const somes: Option<string>[] = [Option.from('A'), Option.from('B')]
    const result: Option<string> = Option.combine((a, b) => `${a}${b}`)(
      somes[0],
      somes[1]
    )
    expect(result.getOrElse('fail')).toEqual('AB')
  })
  it('Some - can return different type', function() {
    const somes: Option<number>[] = [parseIntOption('1'), parseIntOption('2')]
    const reducer = Option.combine(
      (prev: number, curr: number) => `${prev}${curr}`
    )
    const result: Option<string> = reducer(somes[0], somes[1])
    expect(result.getOrElse('fail')).toEqual('12')
  })
  it('Some - can use combine with [].reduce', function() {
    const somes: Option<number>[] = [
      parseIntOption('1'),
      parseIntOption('2'),
      parseIntOption('3')
    ]
    const reducer = Option.combine((prev: number, curr: number) => prev + curr)
    const result = somes.reduce(reducer)
    expect(result.getOrElse(-999)).toEqual(6)
  })

  it('Some - can return different type with [].reduce', function() {
    const somes: Option<number>[] = [parseIntOption('4'), parseIntOption('5')]
    const reducer = Option.combine(
      (prev: string, curr: number) => `${prev}${curr}`
    )
    const result: Option<string> = somes.reduce(reducer, new Some('123'))
    expect(result.getOrElse('fail')).toEqual('12345')
  })
  it('None - returns none if first option is None', function() {
    const nones: Option<number>[] = [parseIntOption('A'), parseIntOption('2')]
    const reducer = Option.combine(
      (prev: number, curr: number) => `${prev}${curr}`
    )
    const result: Option<string> = reducer(nones[0], nones[1])
    expect(result.getOrElse('fail')).toEqual('fail')
  })
  it('None - returns none if second option is None', function() {
    const nones: Option<number>[] = [parseIntOption('1'), parseIntOption('B')]
    const reducer = Option.combine(
      (prev: number, curr: number) => `${prev}${curr}`
    )
    const result: Option<string> = reducer(nones[0], nones[1])
    expect(result.getOrElse('fail')).toEqual('fail')
  })
  it('None - can use combine with [].reduce', function() {
    const somes: Option<number>[] = [
      parseIntOption('1'),
      parseIntOption('a2a'),
      parseIntOption('3')
    ]
    const reducer = Option.combine((prev: number, curr: number) => prev + curr)
    const result = somes.reduce(reducer)
    expect(result.getOrElse(-999)).toEqual(-999)
  })
})
