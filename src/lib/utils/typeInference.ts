import { ObjectId } from "bson";

type TypeGuard<T> = (v: any) => v is T;

export function isNotNull<T>(input: null | undefined | T): input is T {
  return input != null;
}

export function isOptionalString(s: any): s is string | undefined {
  return isOptional(isString, s);
}

export function isArrayOf<T>(typeGuard: TypeGuard<T>, a: any): a is T[] {
  return a && a instanceof Array && a.every(typeGuard);
}

export function isOptional<T>(
  typeGuard: TypeGuard<T>,
  x: any
): x is T | undefined {
  return typeof x === "undefined" || typeGuard(x);
}

export function isDefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}

export function isString(s: any): s is string {
  return typeof s === "string";
}

export function isNumber(n: any): n is number {
  return typeof n === "number";
}

export function isOptionalNumber(n: any): n is number | undefined {
  return isOptional(isNumber, n);
}

export function isBoolean(b: any): b is boolean {
  return typeof b === "boolean";
}

export function isOptionalArrayOf<T>(
  typeguard: TypeGuard<T>,
  a: any
): a is T[] | undefined {
  return typeof a === "undefined" || isArrayOf<T>(typeguard, a);
}

export function isObjectId(o: any): o is ObjectId {
  return o instanceof ObjectId;
}
