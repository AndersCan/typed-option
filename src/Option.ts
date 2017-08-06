export abstract class Option<A> {
  protected abstract _isSome(): boolean
  map<B>(fn: (a: A) => B): Option<B> {
    if (this.isSome()) {
      return new Some(fn(this.get()))
    } else {
      return new None<B>();
    }
  }

  flatMap<B>(fn: (a: A) => Option<B>): Option<B> {
    if (this.isSome()) {
      return fn(this.get())
    } else {
      return new None<B>();
    }
  }

  isNone(): this is None<never> {
    return !this._isSome()
  }
  isSome(): this is Some<A> {
    return this._isSome()
  }
}

export class None<A> extends Option<A>{
  protected _isSome() {
    return false;
  }
}

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