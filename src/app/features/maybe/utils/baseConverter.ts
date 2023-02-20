// @ts-expect-error
import AnyBase from 'any-base'

const base = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_'

export const toBase64 = AnyBase(AnyBase.BIN, base) as (bin: string) => string

const bin = AnyBase(base, AnyBase.BIN)

export const toBin = (base64: string): string => {
  let hash = bin(base64)

  while (hash.length < 8 * 8) {
    hash = '0' + hash
  }

  return hash
}
