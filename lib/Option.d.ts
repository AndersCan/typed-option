export interface Matchers<R1, V, R2 = R1> {
    none: R1 | (() => R1);
    some: R2 | ((v: V) => R2);
}
export declare abstract class Option<A> {
    protected constructor();
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
    abstract match<R1, R2 = R1>(matcher: Matchers<R1, A, R2>): R1 | R2;
    map<B>(fn: (a: A) => B | undefined): Option<B>;
    flatMap<B>(fn: (a: A) => Option<B>): Option<B>;
    getOrElse<B>(fn: (() => B)): A | B;
    getOrElse<B>(constant: B): A | B;
    orElse<B>(fn: () => Option<B>): Option<A | B>;
    orElse<B>(constant: Option<B>): Option<A | B>;
    filter(fn: (a: A) => boolean): Option<A>;
    isNone(): this is None;
    isSome(): this is Some<A>;
    protected _isSome(): boolean;
}
export declare class None extends Option<never> {
    constructor();
    match<T>(matcher: Matchers<never, T>): never;
}
export declare const singletonNone: None;
export declare class Some<A> extends Option<A> {
    readonly value: A;
    constructor(value: A);
    get(): A;
    match<R1, R2 = R1>(matcher: Matchers<R1, A, R2>): R1 | R2;
}
