import * as fc from 'fast-check'
import { Option } from '../src'

// Properties
describe('Option - basic properties', () => {
  const isUndefinedOrNull = (x: any) => x === undefined || x === null
  it('Only undefined and null give None from "Option.from"', () => {
    fc.assert(
      fc.property(fc.anything(), anything => {
        const opt = Option.from(anything)
        const isUndefinedOrNullResult = isUndefinedOrNull(anything)
        return opt.isNone()
          ? isUndefinedOrNullResult === true
          : isUndefinedOrNullResult === false
      })
    )
  })
})
