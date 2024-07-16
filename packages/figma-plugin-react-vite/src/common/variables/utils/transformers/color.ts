import { DesignToken } from "style-dictionary/types";

function color(value: VariableValue): string {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "object" && "a" in value) {
    return `rgba(${value.r},${value.g},${value.b},${value.a})`;
  }

  if (typeof value === "object" && !("a" in value) && "r" in value) {
    return `rgb(${value.r},${value.g},${value.b})`;
  }

  if (
    typeof value === "object" &&
    "type" in value &&
    value.type === "VARIABLE_ALIAS"
  ) {
    console.error("Variable alias is still not implemented. Returning empty.");

    return "";
  }

  console.warn("Unexpected color value. Returning empty.");
  return "";
}

export function colorVariable(variable: Variable, modeId: string): DesignToken {
  if (variable?.resolvedType !== "COLOR") {
    console.error("variable is not a color variable. Returning empty.");
    return {};
  }

  const variableKeys = variable?.name.split("/");

  const result = variableKeys.reduceRight((accumulator, variableKey) => {
    // Set the value at the lowest leaf of the structure
    if (Object.keys(accumulator).length === 0) {
      return {
        [variableKey]: { value: color(variable.valuesByMode[modeId]) },
      };
    }

    // Wrap the inner structure at an highest level leaf
    return { [variableKey]: accumulator };
  }, {});

  return result;
}
