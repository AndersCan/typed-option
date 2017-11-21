import { Option } from "../../src/index";

interface Single {
  a?: string
}
interface DeepNested {
  val: 'A'
  a?: {
    val: 'B'
    b?: {
      val: 'C'
      c: string
    }
  }
}

function getNestedObj(): DeepNested{
  const FullObj: DeepNested = {
    val: 'A',
    a: {
      val: 'B',
      b: {
        val: 'C',
        c: 'ABC'
      }
    }
  }
  return FullObj
}

const single: Single = {
  a: 'single'
}

describe('Option - working with Interfaces', function() {
  it('Option.from called with `string | undefined` returns `string`', function () {
    const stringOrUndefined = single.a
    const opt: Option<string> = Option.from(stringOrUndefined)
    const some: string = opt.getOrElse('1')
    expect(some).toEqual('single')
  })
})
