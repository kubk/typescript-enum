import { EnumLike } from './types';
import { enumValues } from './enumValues';

export function isEnumValid<T extends EnumLike>(
  param: unknown,
  enumObject: T
): param is T[keyof T] {
  // @ts-ignore
  return enumValues(enumObject).includes(param);
}
