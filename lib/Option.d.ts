export interface Matchers<R1, V, R2 = R1> {
    none: R1 | (() => R1);
    some: R2 | ((v: V) => R2);
}
export declare abstract class Option<A> {
    protected constructor();
    protected abstract _isSome(): boolean;
    /**
     * Smart constructor for Options.
     * Returns None if `element` is `undefined` or fails predicate check.
     *
     * @param element The element to convert to a Option
     * @param predicate Optional predicate to determine if ele is None or Some
     * @return {Option} returns a `None` for all falsy values
     */
    static from<E>(element: E | undefined, predicate?: (e: E) => boolean): Option<E>;
    /**
     * Combines two options into a new option.
     * Curried for easier integration with `[].reduce`
     * @param fn function that combines two Options
     */
    static combine<A, B, C>(fn: (a: A, b: B) => C): (a: Option<A>, b: Option<B>) => Option<C>;
    toString(): string;
    /**
     * Runs function `fn` with the current value
     * @param fn function to apply to value
     * @returns this
     */
    do(fn: (a: A) => void): this;
    /**
     * Maps the current value to a new value.
     * @param fn function that `map`s the current value to a new value
     * @returns Some(newValue) or None
     */
    map<B>(fn: (a: A) => B | undefined): Option<B>;
    /**
     * Same as `map`, but for when `fn` returns a Option. `flatMap` removes the nested `Option`
     * @param fn function that returns a Option
     * @returns Some(newValue) or None
     */
    flatMap<B>(fn: (a: A) => Option<B>): Option<B>;
    /**
     * Some - returns the current value.
     * None - returns the given `input`.
     * @param input function or constant that is returned if `this` is `None`
     */
    getOrElse<B>(fn: (() => B)): A | B;
    getOrElse<B>(constant: B): A | B;
    /**
     * Some - returns `this`.
     * None - returns the given `input`.
     * @param input function or constant that is returned if `this` is `None`
     */
    orElse<B>(fn: () => Option<B>): Option<A | B>;
    orElse<B>(constant: Option<B>): Option<A | B>;
    /**
     * Tests that the current value holds the `fn` predicate
     * @param fn predicate function to test current value
     * @returns `this` if predicate holds else None
     */
    filter(fn: (a: A) => boolean): Option<A>;
    filter<B extends A>(fn: (a: A) => a is B): Option<B>;
    /**
     * A `pattern matching` syntax on Options
     * @param matcher object with keys `none` and `some`
     */
    match<R1, R2 = R1>(matcher: Matchers<R1, A, R2>): R1 | R2;
    isNone(): this is None;
    isSome(): this is Some<A>;
}
export declare class None extends Option<never> {
    constructor();
    protected _isSome(): boolean;
}
export declare const singletonNone: None;
export declare class Some<A> extends Option<A> {
    readonly value: A;
    constructor(value: A);
    protected _isSome(): boolean;
    get(): A;
}
