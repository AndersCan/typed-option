export class Lazy<A> {
  value: undefined | A
  constructor(private fn: () => A) {}

  public map<B>(fn: (a: A) => B): Lazy<B> {
    return new Lazy(() => fn(this.get()))
  }
  public get() {
    if (this.value === undefined) {
      this.value = this.fn()
    }
    return this.value
  }
}
