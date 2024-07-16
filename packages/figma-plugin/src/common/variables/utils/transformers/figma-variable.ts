import { mergeDeepRight } from "rambda";
import { transform } from ".";
import { DesignTokens } from "style-dictionary/types";

export async function figmaVariable(
  variableId: string
): Promise<DesignTokens | null> {
  const variable = await figma.variables.getVariableByIdAsync(variableId);

  if (!variable) {
    console.error("Variable not found. Returning empty.");
    return null;
  }

  const modes = Object.keys(variable.valuesByMode);

  const variables = modes.reduce((accumulator, modeId) => {
    switch (variable?.resolvedType) {
      case "COLOR":
        return mergeDeepRight(accumulator, {
          $type: "color",
          ...transform.colorVariable(variable, modeId),
        });

      // TODO: add other variants

      default:
        console.log("unknown type", variable?.resolvedType);
        return accumulator;
    }
  }, {});

  return Object.keys(variables).length > 0 ? variables : null;
}
