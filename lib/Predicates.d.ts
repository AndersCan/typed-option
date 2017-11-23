export interface IPredicate {
    <T>(input: T): boolean;
}
export interface IPredicates {
    TRUTHY: IPredicate;
    DEFINED: IPredicate;
    ANY: IPredicate;
}
export declare const Predicates: IPredicates;
