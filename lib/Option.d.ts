export declare abstract class Option<A> {
    /**
     * Smart constructor for Options.
     * Default predicate returns None iff `ele` is falsy else Some(ele)
     *
     * @param element The element to convert to a Option
     * @param predicate Optional predicate to determine if ele is None or Some
     * @return {Option} returns a `None` for all falsy values
     */
    static from<E>(element: E, predicate?: (e: E) => boolean): Option<E>;
    toString(): string;
    protected abstract _isSome(): boolean;
    map<B>(fn: (a: A) => B): Option<B>;
    flatMap<B>(fn: (a: A) => Option<B>): Option<B>;
    getOrElse(fn: () => A): A;
    orElse(fn: () => Option<A>): Option<A>;
    filter(fn: (a: A) => boolean): Option<A>;
    isNone(): this is None;
    isSome(): this is Some<A>;
}
export declare class None extends Option<never> {
    protected _isSome(): boolean;
}
export declare const singletonNone: None;
export declare class Some<A> extends Option<A> {
    readonly value: A;
    constructor(value: A);
    protected _isSome(): boolean;
    get(): A;
}
