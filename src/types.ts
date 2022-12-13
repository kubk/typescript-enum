export type EnumLike = { [key: string]: number | string };

export type EnumFiltered<E extends EnumLike> = E extends { [key: string]: infer ET | string }
  ? ET
  : never;
