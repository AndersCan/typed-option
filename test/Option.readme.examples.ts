import { Option } from '../src/index'

function canFailFn(x: string): string | undefined {
  if (0.1 < Math.random()) {
    return x
  }
  return undefined
}

let result1 = 'FAILED'
const a = canFailFn('Hello, world') // a is string | undefined
if (a) {
  const b = canFailFn(a) // b is string | undefined
  if (b) {
    const c = canFailFn(b) // c is string | undefined
    if (c) {
      result1 = c // c is string
    }
  }
}
// === into this ===

const result2 = Option.from('Hello, world')
  .map(v => canFailFn(v)) // v is of type string.
  .map(v => canFailFn(v)) // v is of type string.
  .map(v => canFailFn(v)) // v is of type string.
  .getOrElse('FAILED')

// optional

interface MyNumbers {
  a?: number
  b?: number
}
const myNumbers: MyNumbers = {
  a: 5,
  b: undefined
}
Option.from(myNumbers.a)
Option.from(myNumbers.b)
