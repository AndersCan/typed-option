import { Predicates } from './Predicates'

export interface Matchers<R1, V, R2 = R1> {
  none: R1 | (() => R1)
  some: R2 | ((v: V) => R2)
}

export abstract class Option<A> {
  /**
   * Smart constructor for Options.
   * Default predicate returns None iff `ele` is falsy else Some(ele)
   *
   * @param element The element to convert to a Option
   * @param predicate Optional predicate to determine if ele is None or Some
   * @return {Option} returns a `None` for all falsy values
   */
  static from<E>(
    element: E,
    predicate: (e: E) => boolean = Predicates.TRUTHY
  ): Option<E> {
    return predicate(element) ? new Some(element) : singletonNone
  }

  public toString(): string {
    return this.map(e => `Some(${e})`).getOrElse(() => 'None')
  }

  public abstract match<R1, R2 = R1>(matcher: Matchers<R1, A, R2>): R1 | R2

  map<B>(fn: (a: A) => B): Option<B> {
    return this.match<Option<B>>({
      none: () => singletonNone,
      some: v => {
        return new Some(fn(v))
      }
    })
  }

  flatMap<B>(fn: (a: A) => Option<B>): Option<B> {
    return this.match({
      none: () => singletonNone,
      some: v => fn(v)
    })
  }

  getOrElse(fn: () => A): A {
    return this.match({
      none: () => fn(),
      some: v => v
    })
  }

  orElse(fn: () => Option<A>): Option<A> {
    return this.match({
      none: () => fn(),
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
      return matcher.some(this.value)
    } else {
      return matcher.some
    }
  }
}
