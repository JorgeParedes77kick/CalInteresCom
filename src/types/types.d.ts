/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

export type types = string | number | boolean | symbol | undefined | object | Function | null;
export type AnyFunction = (...args: any) => any;
export type FunctionType<T> = (...args: any) => T;
export type AnyKeyObject = { [K: string]: any };
export type KeyObjectType<T> = { [K: string]: T };
