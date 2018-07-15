import { Lazy } from '../../src/lazy'
import { Option } from '../../src/'

describe('Lazy', () => {
  it('can get', function() {
    const l1 = new Lazy(() => 10)
    const l2 = l1.map(a => a + 10).map(a => a + 10)

    expect(l2.get()).toBe(30)
  })

  it('is lazy', function() {
    let counter = 0
    function sideEffect(a: number): number {
      counter++
      return a + 10
    }
    const l1 = new Lazy(() => 10)
    const l2 = l1.map(sideEffect).map(sideEffect)

    expect(counter).toBe(0)
    expect(l2.value === undefined)
  })

  it('does not recalculate after a get', function() {
    let counter = 0
    function sideEffect(a: number): number {
      counter++
      return a + 10
    }
    const l1 = new Lazy(() => 10)
    const l2 = l1.map(sideEffect).map(sideEffect)
    l2.get()
    l2.get()
    l2.get()
    expect(counter).toBe(2)
    expect(l2.value === undefined)
  })

  it('speed test', function() {
    const mapFn: (a: number) => number = a => a + 10

    const lnow = performance.now()
    const l1 = new Lazy(() => 10)
    const l2 = l1.map(mapFn).map(mapFn)
    const lend = performance.now() - lnow

    const optstart = performance.now()
    const opt = Option.from(10)
      .map(mapFn)
      .map(mapFn)
    const optend = performance.now() - optstart

    console.log('lend', lend)
    console.log('optend', optend)

    expect(l2.get()).toBe(30)
    expect(opt.getOrElse(-1)).toBe(30)
  })
})
