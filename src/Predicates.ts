export interface IPredicate {
  <T>(input: T): boolean
}
export interface IPredicates {
  TRUTHY: IPredicate
  DEFINED: IPredicate
  ANY: IPredicate
}
export const Predicates: IPredicates = {
  TRUTHY: e => !!e,
  DEFINED: e => e !== undefined,
  ANY: e => true
}
