# typed-option
[![Build Status](https://travis-ci.org/AndersCan/typed-option.svg?branch=master)](https://travis-ci.org/AndersCan/typed-option)
[![codecov](https://codecov.io/gh/AndersCan/typed-option/branch/master/graph/badge.svg)](https://codecov.io/gh/AndersCan/typed-option)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Option library with types.

## tl;dr
Makes working with, potentially, `undefined` values and functions more concise.

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
const a = canFailFn('Hello, world') // a is string | undefined
if (a) {
  const b = canFailFn(a) // b is string | undefined
  if (b) {
    const c = canFailFn(b) // c is string | undefined
    if (c) {
      result = 'SUCCESS' // c is string
    }
  }
}
console.log(result)
```

Into this:
```javascript
import { Option } from 'typed-option'

const result2 = Option.from('Hello, world')
  .map(canFailFn)
  .map(canFailFn)
  .map(canFailFn)
  .getOrElse('FAILED')
console.log(result2)
```
## Intro
An `Option` is either of type `Some` or `None`.
* **Some** - represents a value of something (a *defined* value)
* **None** - represents a value of nothing (an *undefined* value)
You do not need to know if previous calculations have failed before calling the next one. (as seen above)

## Functions
### Explanation

`Option.from` gives you a `None` for `undefined` values and a `Some` for `defined` values.
```javascript
Option.from(true) // Some(true)
Option.from({}) // Some({})
Option.from(false) // Some({})
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

`do` run a fn to a Option if it is of type `Some`. Similar to `map`, but does not alter the Option.
```javascript
some('world').do(text => console.log(text)) // logs: 'world'
none().do((text) => console.log(text)) // logs nothing
```

`map` apply fn to a Option if it is of type `Some`
```javascript
some('world').map((text) => "Hello, " + text) // Some('Hello, world')
none().map((text) => "Hello, " + text) // None
```

`flatMap` Same as map, but for when `fn` returns a option. `flatMap` removes the nested option.
```javascript
function getOptionFn(...): Option<string>
const option = ...
option.map(getOptionFn) // Some(Some('MyMiddleName'))
option.flatMap(getOptionFn) // Some('MyMiddleName')
```

`getOrElse` get the value from a `Some` or return the `else` value for a `None`
```javascript
some(1).getOrElse(() => 999) // 1
none().getOrElse(() => 999) // 999
```

`orElse` is the same as `getOrElse`, but `else` returns a Option
```javascript
some(1).orElse(() => Some(999)) // Some(1)
none().orElse(() => Some(999)) // Some(999)
```

`filter` gives a predicate that a `Some` must hold. If not, returns `None`
```javascript
some(1).filter((v) => false) // None()
some(100).filter((v) => true) // Some(100)
none().filter((v) => true) // None()
```

`match` gives a `pattern matching` way to modify a Option
```javascript
some(1).match({
  none: () => 'a none',
  some: v => `a Some(${v})`
}) // a Some(1)
none().match({
  none: () => 'a none',
  some: v => `a Some(${v})`
}) // a none
```

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