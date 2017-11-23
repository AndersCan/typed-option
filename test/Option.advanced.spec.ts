import { Option, Some, None } from '../src/index'

const parseIntOption = (v: string): Option<number> => {
  const result = Number.parseInt(v)
  if (Number.isNaN(result)) {
    return None
  } else {
    return new Some(result)
  }
}

function lift<A, B>(fn: (x: A) => B): (y: Option<A>) => Option<B> {
  return z => z.map(fn)
}

function liftMulti<A, B, C>(
  ao: Option<A>,
  bo: Option<B>,
  fn: (a: A, b: B) => C
): Option<C> {
  if (ao.isSome() && bo.isSome()) {
    return new Some(fn(ao.get(), bo.get()))
  } else {
    return None
  }
}
describe('Option - advanced usage ', function() {
  describe('lifting ', function() {
    it('single input values', function() {
      const absoluteLifted = lift(Math.abs)
      const opt1 = new Some(-1000)
      const opt1Abs = absoluteLifted(opt1)
      expect(opt1Abs.getOrElse(() => 1)).toEqual(1000) // 1000
    })
    it('multiple input values', function() {
      const opt1 = new Some(1)
      const opt2 = new Some(10)
      const maxOpt = liftMulti(opt1, opt2, Math.max)
      expect(maxOpt.getOrElse(() => 1)).toEqual(10) // 1000
    })
    it('multiple input values -- returns None', function() {
      const opt1 = None
      const opt2 = new Some(10)
      const maxOpt = liftMulti(opt1, opt2, Math.max)
      expect(maxOpt.getOrElse(() => -1)).toEqual(-1) // 1000
    })
  })
})
