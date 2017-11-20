export interface IPredicate {
  <T>(input: T): boolean
}
export interface IPredicates {
  TRUTHY: IPredicate
  DEFINED: IPredicate
}
export const Predicates: IPredicates = {
  TRUTHY: e => !!e,
  DEFINED: e => e !== undefined
}
