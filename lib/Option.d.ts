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
    toString(): string;
    do(fn: (a: A) => void): this;
    map<B>(fn: (a: A) => B | undefined): Option<B>;
    flatMap<B>(fn: (a: A) => Option<B>): Option<B>;
    getOrElse<B>(fn: (() => B)): A | B;
    getOrElse<B>(constant: B): A | B;
    orElse<B>(fn: () => Option<B>): Option<A | B>;
    orElse<B>(constant: Option<B>): Option<A | B>;
    filter(fn: (a: A) => boolean): Option<A>;
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
