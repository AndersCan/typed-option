import { Option } from '../src/index'

function canFailFn(x: string): string | undefined | null {
  if (Math.random() < 0.1) {
    return x
  }
  return undefined
}

let result1 = 'FAILED'
const a = canFailFn('SUCCESS') // a is string | undefined
if (a) {
  const b = canFailFn(a) // b is string | undefined
  if (b) {
    const c = canFailFn(b) // c is string | undefined
    if (c) {
      result1 = c // c is string
    }
  }
}
console.log(result1)
// === into this ===

const result2 = Option.from('SUCCESS')
  .map(v => canFailFn(v)) // v is of type string.
  .map(v => canFailFn(v)) // v is of type string.
  .map(v => canFailFn(v)) // v is of type string.
  .getOrElse('FAILED')
console.log(result2)

// or just
const result3 = Option.from('SUCCESS')
  .map(canFailFn)
  .map(canFailFn)
  .map(canFailFn)
  .getOrElse('FAILED')
console.log(result3)

// optional

interface Foo {
  a?: number
}
const myFoo: Foo = {
  a: 5
}
myFoo.a // 'number | undefined`'
const fooOption = Option.from(myFoo.a) // Option<number>
fooOption.map(a => a) // typeof a is number
