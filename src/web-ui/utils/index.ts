
import type {
  IAsyncTryCatch,
  ITryCatch,
  IWithAsyncTryCatch,
  IWithTryCatch,
} from "../types/utils"

//

export const tryCatch: ITryCatch = (func, ...args) => {
  try {
    return func(...args)
  }
  catch (ex) {
    return new Error((ex as Error).message)
  }
}

export const asyncTryCatch: IAsyncTryCatch = async (func, ...args) => {
  try {
    return await func(...args)
  }
  catch (ex) {
    return new Error((ex as Error).message)
  }
}

export const withTryCatch: IWithTryCatch = (func) => {
  return (...args) => tryCatch(func, ...args)
}

export const withAsyncTryCatch: IWithAsyncTryCatch = (func) => {
  return (...args) => asyncTryCatch(func, ...args)
}

const dummy = async (bar: string) => {
  return 3
}

const foo = withAsyncTryCatch(dummy)

const bar = foo("")
