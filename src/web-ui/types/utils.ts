
export type IFunc<R = any> = (...args: any[]) => R

export type IFuncArgs<F> = F extends (...args: infer A) => any ? A : never

export type IAwaited<T> = T extends Promise<infer R> ? R : never

export type IAwaitedFunc<F> = F extends IFunc<infer R> ? IAwaited<R> : never

export type ITryCatch = <F extends IFunc>(func: F, ...args: IFuncArgs<F>) => ReturnType<F> | Error

export type IAsyncTryCatch = <F extends IFunc<Promise<any>>>(func: F, ...args: IFuncArgs<F>) => Promise<IAwaitedFunc<F> | Error>

export type IWithTryCatch = <F extends IFunc>(func: F) =>
  (...args: IFuncArgs<F>) => ReturnType<F> | Error

export type IWithAsyncTryCatch = <F extends IFunc<Promise<any>>>(func: F) =>
  (...args: IFuncArgs<F>) => Promise<IAwaitedFunc<F> | Error>
