export type CamelToSnakeCase<S extends string> =
  S extends `${infer T}${infer U}`
    ? `${T extends Capitalize<T>
        ? '_'
        : ''}${Lowercase<T>}${CamelToSnakeCase<U>}`
    : S;

export type CamelKeysToSnakeCase<T> = T extends Array<infer U>
  ? CamelKeysToSnakeCase<U>[]
  : T extends object
  ? {
      [K in keyof T as CamelToSnakeCase<K & string>]: CamelKeysToSnakeCase<
        T[K]
      >;
    }
  : T;
