export interface IPredicate {
  <T>(input: T): boolean
}
export interface IPredicates {
  [key: string]: IPredicate
}
export const Predicates: IPredicates = {
  TRUTHY: e => !!e,
  DEFINED: e => e !== undefined
}
