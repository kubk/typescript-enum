import { EnumLike } from './types';

export function enumValues<E extends EnumLike>(enumObject: E): E[keyof E][] {
  return Object.keys(enumObject)
    .filter((key) => Number.isNaN(Number(key)))
    .map((key) => enumObject[key] as E[keyof E]);
}
