import { EnumLike } from './types';
import { getEnumValues } from './getEnumValues';

export function isValidEnumValue<T extends EnumLike>(
  param: unknown,
  enumObject: T
): param is T[keyof T] {
  return getEnumValues(enumObject).includes(param as any);
}
