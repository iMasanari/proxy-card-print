import { Dispatch, useCallback } from 'react'

export const useAction = <T extends (...args: U) => unknown, U extends any[]>(fn: T, dispatch: Dispatch<any>) => {
  const result = useCallback((...args: U) => dispatch(fn(...args)), [fn, dispatch])

  return result as T
}
