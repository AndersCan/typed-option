#typed-option


Option library for TypeScript.

An `Option` is either of type `Some` or `None`.
* **Some** - represents a value of something (a *defined* value)
* **None** - represents a value of nothing (an *undefined* value)

## Purpose and useage
The main purpose of using a `Option` is so that error cases are handled by the caller and not forgotten. Lets illustrate this with an example.

We have a function that returns the first element of a list.
 ```javascript
 function getFirst(list: number[]): number{
   if(!list || list.length === 0){
     return undefined
   } else {
     return list[0]
   }
 }
 getFirst([1,2,3]) // 1
 getFirst([3,2,1]) // 3
 ```
The issue her is that all callers of `getFirst` must remember to check if the return value is `undefined`.
  ```javascript
 getFirst([]) // undefined
 getFirst(undefined) // undefined
 ```
Note: If you are using `strict: true` in your tsconfig, check the example further down.

If the caller forgets to check for this, the `undefined` value could be passed further along to other parts of the code. This could potentially cause a runtime exception far away from the `getFirst` method call.

We can avoid this issue by taking advantage of `Option`. Let us rewrite `getFirst` to return a `Option<number>` instead of a `number`.

 ```javascript
 import {Option, Some, None} from 'typed-option'

 function getFirst(list: number[]): Option<number>{
   if(list.length === 0){
     return new None()
   } else {
    return new Some(list[0])
   }
 }
 getFirst([1,2,3]) // Some(1)
 getFirst([]) // None()
 ```
To actually use the return value from `getFirst`, we have to check if it is a `Some`.

```javascript
const opt1 = getFirst([1,2,3]) // Some(1)
if(opt1.isSome()){
  // TypeScript will infere that this is a Some type and allow us to call `.get`
  console.log('getFirst([1,2,3])', opt1.get())
}
```
If you want a default value for when a option is of type None, you can use `getOrElse`
```javascript
getFirst([1,2,3]).getOrElse(() => 999) // 1
getFirst([]).getOrElse(() => 999) // 999
```
Read the section below for more methods.

## Methods
### Explanation
Defining some helper methods to help illustrate functions use cases
```javascript
interface Person {
  name: string,
  middleName?: string
}
const people: Person[] = [
  {
    name: 'NoMiddleName'
  },
  {
    name: 'HasMiddleName',
    middleName: 'MyMiddleName'
  }
]
const findPerson = (input: string): Option<Person> => {
  const result = people.find(p => p.name === input)
  if (result) {
    return new Some(result)
  } else {
    return new None()
  }
}
const getMiddleName = (person: Person): Option<string> => {
  if (person.middleName) {
    return new Some(person.middleName)
  } else {
    return new None()
  }
}
```

`map` apply fn to a Option if it is of type `Some`
```javascript
some('world').map((text) => "Hello, " + text) // Some('Hello, world')
none().map((text) => "Hello, " + text) // None()
```

`flatMap` Same as map, but `fn` returns a option. `flatMap` removes the nested option.
```javascript
const option = findPerson('HasMiddleName')
option.flatMap(getMiddleName) // Some('MyMiddleName')
option.map(getMiddleName) // Some(Some('MyMiddleName'))
```

`getOrElse` get the value from a `Some` or return the `else` value for `None`
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
some(1).filter((v) => v === 100) // None()
some(100).filter((v) => v === 100) // Some(100)
none().filter((v) => true) // None()
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

### Method signatures:
* map<B>(fn: (a: A) => B): Option<B>;
* flatMap<B>(fn: (a: A) => Option<B>): Option<B>;
* getOrElse(fn: () => A): A;
* orElse(fn: () => Option<A>): Option<A>;
* filter(fn: (a: A) => boolean): Option<A>;
* isNone(): this is None;
* isSome(): this is Some<A>;