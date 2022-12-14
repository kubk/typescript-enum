import { EnumLike, EnumFiltered } from './types';

export function enumValues<E extends EnumLike>(enumObject: E): EnumFiltered<E>[] {
  return Object.keys(enumObject)
    .filter((key) => Number.isNaN(Number(key)))
    .map((key) => enumObject[key] as EnumFiltered<E>);
}
