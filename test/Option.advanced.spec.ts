import { Option, Some, None } from '../src/index'

const parseIntOption = (v: string): Option<number> => {
  const result = Number.parseInt(v)
  if (Number.isNaN(result)) {
    return new None()
  } else {
    return new Some(result)
  }
}

describe("Option - advanced usage ", function () {
  it("Can Lift values", function () {
    function lift<A, B>(fn: (x: A) => B): (y: Option<A>) => Option<B> {
      return z => z.map(fn)
    }

    const absoluteLifted = lift(Math.abs)
    const opt1 = new Some(-1000)
    const opt1Abs = absoluteLifted(opt1)
    if (opt1Abs.isSome()) (
      expect(opt1Abs.get()).toEqual(1000) // 1000
    )
  });
});