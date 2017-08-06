export declare abstract class Option<A> {
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
export declare class Some<A> extends Option<A> {
    value: A;
    constructor(value: A);
    protected _isSome(): boolean;
    get(): A;
}
