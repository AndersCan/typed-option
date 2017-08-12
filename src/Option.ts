export abstract class Option<A> {
  /**
   * Smart constructor for Options.
   * Returns None iff `ele` is falsy else Some(ele)
   *
   * @param ele The element to convert to a Option
   * @return {Option} returns a `None` for all falsy values
   */
  static from<E>(ele: E): Option<E> {
    return !!ele ? new Some(ele) : singletonNone
  }
  protected abstract _isSome(): boolean
  map<B>(fn: (a: A) => B): Option<B> {
    if (this.isSome()) {
      return new Some(fn(this.get()))
    } else {
      return singletonNone;
    }
  }

  flatMap<B>(fn: (a: A) => Option<B>): Option<B> {
    if (this.isSome()) {
      return fn(this.get())
    } else {
      return singletonNone;
    }
  }

  getOrElse(fn: () => A): A {
    if (this.isSome()) {
      return this.get();
    } else {
      return fn();
    }
  }

  orElse(fn: () => Option<A>): Option<A> {
    if (this.isSome()) {
      return this;
    } else {
      return fn();
    }
  }

  filter(fn: (a: A) => boolean): Option<A> {
    if (this.isSome()) {
      if (fn(this.get())) {
        return this
      } else {
        return singletonNone
      }
    } else {
      return singletonNone
    }
  }

  isNone(): this is None {
    return !this._isSome()
  }
  isSome(): this is Some<A> {
    return this._isSome()
  }
}

export class None extends Option<never>{
  protected _isSome() {
    return false;
  }
}
export const singletonNone = new None();


export class Some<A> extends Option<A>{
  constructor(public value: A) {
    super()
  }
  protected _isSome() {
    return true;
  }
  get(): A {
    return this.value;
  }
}