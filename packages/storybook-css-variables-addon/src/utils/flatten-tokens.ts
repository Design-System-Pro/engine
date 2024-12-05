import type { Group, Token } from "@terrazzo/token-tools";

interface FlattenedTokens {
  [key: string]: Token;
}

export function flattenTokens(
  designTokens: Group,
  prefix = "",
): FlattenedTokens {
  return Object.entries(designTokens).reduce((flattened, [key, value]) => {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (value && typeof value === "object" && !Array.isArray(value)) {
      if ("$type" in value && "$value" in value) {
        // This is a token
        return { ...flattened, [newKey]: value };
      } else {
        // This is a nested object
        return { ...flattened, ...flattenTokens(value, newKey) };
      }
    }

    return flattened;
  }, {} as FlattenedTokens);
}

export function unflattenTokens(flattenedTokens: FlattenedTokens): Group {
  return Object.entries(flattenedTokens).reduce((result, [key, value]) => {
    const segments = key.split(".");
    const lastIndex = segments.length - 1;

    segments.reduce((current, segment, index) => {
      if (index === lastIndex) {
        current[segment] = value;
      } else {
        current[segment] = current[segment] || {};
      }
      return current[segment];
    }, result);

    return result;
  }, {} as Group);
}
