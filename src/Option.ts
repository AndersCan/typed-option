import { Predicates } from './Predicates'

export interface Matchers<R1, V, R2 = R1> {
  none: R1 | (() => R1)
  some: R2 | ((v: V) => R2)
}

export type NoneTypes = undefined | null

export abstract class Option<A> {
  protected constructor() {}
  protected abstract _isSome(): boolean
  /**
   * Smart constructor for Options.
   * Returns None if `element` is either `undefined`, `null`, or fails predicate check.
   *
   * @param element The element to convert to a Option
   * @param predicate Optional predicate to determine if ele is None or Some
   * @return {Option} returns a `None` for all falsy values
   */
  public static from<E>(
    element: E | NoneTypes,
    predicate: (e: E) => boolean = Predicates.ANY
  ): Option<E> {
    if (element !== undefined && element !== null) {
      return predicate(element) ? new Some(element) : singletonNone
    } else {
      return singletonNone
    }
  }
  /**
   * Combines two options into a new option.
   * Curried for easier integration with `[].reduce`
   * @param fn function that combines two Options
   */
  public static combine<A, B, C>(
    fn: (a: A, b: B) => C
  ): (a: Option<A>, b: Option<B>) => Option<C> {
    return function(optA: Option<A>, optB: Option<B>) {
      return optA.flatMap(a => optB.map(b => fn(a, b)))
    }
  }

  public toString(): string {
    return this.map(e => `Some(${e})`).getOrElse(() => 'None')
  }
  /**
   * Runs function `fn` with the current value
   * @param fn function to apply to value
   * @returns this
   */
  do(fn: (a: A) => void): this {
    if (this.isSome()) {
      fn(this.get())
    }
    return this
  }
  /**
   * Maps the current value to a new value.
   * @param fn function that `map`s the current value to a new value
   * @returns Some(newValue) or None
   */
  map<B>(fn: (a: A) => B | NoneTypes): Option<B> {
    if (this.isSome()) {
      const result = fn(this.get())
      if (result !== undefined && result !== null) {
        return new Some(result)
      }
    }
    return singletonNone
  }

  /**
   * Same as `map`, but for when `fn` returns a Option. `flatMap` removes the nested `Option`
   * @param fn function that returns a Option
   * @returns Some(newValue) or None
   */
  flatMap<B>(fn: (a: A) => Option<B>): Option<B> {
    if (this.isSome()) {
      return fn(this.get())
    } else {
      return singletonNone
    }
  }

  /**
   * Some - returns the current value.
   * None - returns the given `input`.
   * @param input function or constant that is returned if `this` is `None`
   */
  getOrElse<B>(fn: () => B): A | B
  getOrElse<B>(constant: B): A | B
  getOrElse<B>(input: B | (() => B)): A | B {
    if (this.isSome()) {
      return this.get()
    } else {
      return isFunction(input) ? input() : input
    }
  }
  /**
   * Some - returns `this`.
   * None - returns the given `input`.
   * @param input function or constant that is returned if `this` is `None`
   */
  orElse<B>(fn: () => Option<B>): Option<A | B>
  orElse<B>(constant: Option<B>): Option<A | B>
  orElse<B>(input: Option<B> | (() => Option<B>)): Option<A | B> {
    if (this.isSome()) {
      return this
    } else {
      return typeof input === 'function' ? input() : input
    }
  }

  /**
   * Tests that the current value holds the `fn` predicate
   * @param fn predicate function to test current value
   * @returns `this` if predicate holds else None
   */
  filter(fn: (a: A) => boolean): Option<A>
  filter<B extends A>(fn: (a: A) => a is B): Option<B>
  filter<B extends A>(fn: (a: A) => a is B): Option<A> | Option<B> {
    if (this.isSome()) {
      return fn(this.get()) ? this : singletonNone
    } else {
      return singletonNone
    }
  }
  /**
   * A `pattern matching` syntax on Options
   * @param matcher object with keys `none` and `some`
   */
  public match<R1, R2 = R1>(matcher: Matchers<R1, A, R2>): R1 | R2 {
    if (this.isSome()) {
      if (isFunction(matcher.some)) {
        return matcher.some(this.get())
      } else {
        return matcher.some
      }
    } else {
      if (isFunction(matcher.none)) {
        return matcher.none()
      } else {
        return matcher.none
      }
    }
  }

  isNone(): this is None {
    return !this._isSome()
  }

  isSome(): this is Some<A> {
    return this._isSome()
  }
}

export class None extends Option<never> {
  constructor() {
    super()
  }
  protected _isSome() {
    return false
  }
}

export const singletonNone = new None()

export class Some<A> extends Option<A> {
  constructor(public readonly value: A) {
    super()
  }

  protected _isSome() {
    return true
  }

  get(): A {
    return this.value
  }
}

function isFunction(fn: unknown): fn is Function {
  return typeof fn === 'function'
}
