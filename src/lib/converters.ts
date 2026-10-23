
type SnakeToCamelCase<S extends string> =
  S extends `${infer First}_${infer Rest}`
    ? `${First}${Capitalize<SnakeToCamelCase<Rest>>}`
    : S;

type CamelCaseKeys<T> =
  T extends readonly (infer U)[]
    ? CamelCaseKeys<U>[]
    : T extends object
      ? {
          [K in keyof T as K extends string
            ? SnakeToCamelCase<K>
            : K]: CamelCaseKeys<T[K]>;
        }
      : T;

function isPlainObject(
  value: unknown,
): value is Record<string, unknown> {
  if (value === null || typeof value !== "object") {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);

  return prototype === Object.prototype || prototype === null;
}

export function toSnakeCaseKey(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1_$2")
    .toLowerCase();
}

export function toCamelCaseKey(key: string): string {
  return key.replace(/_([a-z])/g, (_, letter: string) =>
    letter.toUpperCase(),
  );
}

export function toSnakeCase(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(toSnakeCase);
  }

  if (!isPlainObject(value)) {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [
      toSnakeCaseKey(key),
      toSnakeCase(item),
    ]),
  );
}

export function toCamelCase<T>(
  value: T,
): CamelCaseKeys<T> {
  if (Array.isArray(value)) {
    return value.map(toCamelCase) as CamelCaseKeys<T>;
  }

  if (!isPlainObject(value)) {
    return value as CamelCaseKeys<T>;
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [
      toCamelCaseKey(key),
      toCamelCase(item),
    ]),
  ) as CamelCaseKeys<T>;
}

export function toPascalCase(value: string): string {
  return value.replace(/(^|_)([a-z])/g, (_, __, letter: string) =>
    letter.toUpperCase(),
  );
}

export function toStatusLabel(status: string): string {
  return status
    .split("_")
    .map((word, index) =>
      index === 0
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word,
    )
    .join(" ");
}
