import { Predicates } from './Predicates'

export interface Matchers<R1, V, R2 = R1> {
  none: R1 | (() => R1)
  some: R2 | ((v: V) => R2)
}

export abstract class Option<A> {
  protected constructor() {}
  /**
   * Smart constructor for Options.
   * Returns None if `element` is `undefined` or fails predicate check.
   *
   * @param element The element to convert to a Option
   * @param predicate Optional predicate to determine if ele is None or Some
   * @return {Option} returns a `None` for all falsy values
   */
  public static from<E>(
    element: E | undefined,
    predicate: (e: E) => boolean = Predicates.ANY
  ): Option<E> {
    if (element !== undefined) {
      return predicate(element) ? new Some(element) : singletonNone
    } else {
      return singletonNone
    }
  }

  public toString(): string {
    return this.map(e => `Some(${e})`).getOrElse(() => 'None')
  }

  public abstract match<R1, R2 = R1>(matcher: Matchers<R1, A, R2>): R1 | R2

  map<B>(fn: (a: A) => B | undefined): Option<B> {
    if (this.isSome()) {
      const result = fn(this.get())
      if (result) {
        return new Some(result)
      }
    }
    return singletonNone
  }

  flatMap<B>(fn: (a: A) => Option<B>): Option<B> {
    return this.match({
      none: () => singletonNone,
      some: v => fn(v)
    })
  }

  getOrElse<B>(fn: (() => B)): A | B
  getOrElse<B>(constant: B): A | B
  getOrElse<B>(input: B | (() => B)): A | B {
    return this.match({
      none: () => (typeof input === 'function' ? input() : input),
      some: v => v
    })
  }

  orElse<B>(fn: () => Option<B>): Option<A | B>
  orElse<B>(constant: Option<B>): Option<A | B>
  orElse<B>(input: Option<B> | (() => Option<B>)): Option<A | B> {
    return this.match({
      none: () => (typeof input === 'function' ? input() : input),
      some: _ => {
        return this
      }
    })
  }

  filter(fn: (a: A) => boolean): Option<A> {
    return this.match({
      none: () => singletonNone,
      some: v => {
        return fn(v) ? this : singletonNone
      }
    })
  }

  isNone(): this is None {
    return !this._isSome()
  }

  isSome(): this is Some<A> {
    return this._isSome()
  }

  protected _isSome() {
    return this.match({
      none: () => false,
      some: _ => true
    })
  }
}

export class None extends Option<never> {
  constructor() {
    super()
  }
  public match<T>(matcher: Matchers<never, T>) {
    if (typeof matcher.none === 'function') {
      return matcher.none()
    } else {
      return matcher.none
    }
  }
}

export const singletonNone = new None()

export class Some<A> extends Option<A> {
  constructor(public readonly value: A) {
    super()
  }

  get(): A {
    return this.value
  }

  public match<R1, R2 = R1>(matcher: Matchers<R1, A, R2>): R1 | R2 {
    if (typeof matcher.some === 'function') {
      return matcher.some(this.get())
    } else {
      return matcher.some
    }
  }
}
