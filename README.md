# typed-option
[![Build Status](https://travis-ci.org/AndersCan/typed-option.svg?branch=master)](https://travis-ci.org/AndersCan/typed-option)
[![codecov](https://codecov.io/gh/AndersCan/typed-option/branch/master/graph/badge.svg)](https://codecov.io/gh/AndersCan/typed-option)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Library for working with `Option`s in a type safe manner.

## tl;dr
`Option`s makes working with, potentially, `undefined` values more concise and easy to read.

**Example**

Given the function:
```javascript
function canFailFn(x: string): string | undefined {
  if (Math.random() > 0.5) {
    return x
  }
  return undefined
}
```

Turn something like this:
```javascript
let result = 'FAILED'
const a = canFailFn('SUCCESS') // a is string | undefined
if (a) {
  const b = canFailFn(a) // b is string | undefined
  if (b) {
    const c = canFailFn(b) // c is string | undefined
    if (c) {
      result = c // c is string
    }
  }
}
console.log(result)
```

Into this:
```javascript
import { Option } from 'typed-option'

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
```

## Intro
An `Option` is either of type `Some` or `None`.
* **Some** - represents a value of something (a *defined* value)
* **None** - represents a value of nothing (an *undefined* value)

In the example above, we start with a `Some('SUCCESS')`. Then we apply the function `canFailFn` multiple times to the value of our `Some`. If the computation fails at any point, we are returned a `None`.

With Options, you do not need to know if you have a `Some` or `None` when applying functions. Only when you need the result do you have to deal with the potential `None` case. This is typically done by calling the `.getOrElse` function (as seen above).

### Unions with undefined
One thing to note is that `undefined` is removed from union types:
```javascript
interface Foo {
  a?: number
}
const myFoo: Foo = {
  a: 5
}
myFoo.a // 'number | undefined`'
const fooOption = Option.from(myFoo.a) // Option<number>
fooOption.map(a => a) // typeof a is number
```
This means that you will not have to worry about manually testing for `undefined`. A `Some` will never contain an `undefined` value.
## Functions
### Explanation

#### Option.from

`Option.from` gives you a `None` for `undefined` values and a `Some` for `defined` values.
```javascript
Option.from(true) // Some(true)
Option.from(false) // Some(false)
Option.from({}) // Some({})
Option.from(0) // Some(0)
Option.from('') // Some('')
Option.from(undefined) // None
```
You can also pass an additional predicate of what a legal value is.
```javascript
Option.from(false, () => true) // Some(false)
Option.from(true, () => false) // None
Option.from(undefined, () => true) // None

```
#### do

`do` runs a fn on a Option if it is of type `Some`. Similar to `map`, but does not alter/return a new Option.
```javascript
some('world').do(text => console.log(text)) // logs: 'world'
none().do((text) => console.log(text)) // logs:
```

#### map

`map` apply a function to a Option if it is of type `Some`
```javascript
some('world').map((text) => "Hello, " + text) // Some('Hello, world')
none().map((text) => "Hello, " + text) // None
```

#### flatMap
`flatMap` Same as map, but for when your function returns an Option. `flatMap` will remove the nested option.
```javascript
function getOptionFn(...): Option<string>
const option = ... // Some('Hello, Option')
option.map(getOptionFn) // Some(Some('Hello, Option'))
option.flatMap(getOptionFn) // Some('Hello, Option')
```

#### getOrElse

`getOrElse` get the value from a `Some` or return the `else` value for a `None`
```javascript
some(1).getOrElse(() => 999) // 1
none().getOrElse(() => 999) // 999
some(1).getOrElse(999) // 1
none().getOrElse(999) // 999
```
#### orElse

`orElse` is the same as `getOrElse`, but `else` returns an Option
```javascript
some(1).orElse(() => Some(999)) // Some(1)
none().orElse(() => Some(999)) // Some(999)
```
#### filter

`filter` gives a predicate that a `Some` must hold. If not, returns `None`
```javascript
some(1).filter((v) => false) // None()
some(100).filter((v) => true) // Some(100)
none().filter((v) => true) // None()
```

#### match
`match` gives a `pattern matching` looking syntax to work with options.
```javascript
some(1).match({
  none: () => 'a none',
  some: v => `a Some(${v})`
}) // a Some(1)

none().match({
  none: () => 'a none',
  some: v => `a Some(${v})`
}) // a none

optionValueIgnored().match({
  none: 'failure',
  some: `success`
})
```
#### isNone & isSome

`isNone` tests if the given `Option` is of type `None`,
`isSome` tests if the given `Option` is of type `Some`
```javascript
const opt1 = ...
if(opt1.isNone()){
  // opt1 is None in this block
}
if(opt1.isSome()){
  // opt1 is Some in this block
}
```