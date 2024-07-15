import { DesignToken } from "./types";

/**
 * Sizing
 * Spacing
 * Color
 * Border Radius
 * Border Width
 * Border
 * Opacity
 * Box Shadow
 * Typography
 * Font Family
 * Font Weight
 * Line Height
 * Font Size
 * Letter Spacing
 * Paragraph Spacing
 * Text Case
 * Text Decoration
 * Composition
 * Assets
 * Dimension
 * Boolean
 * Text
 * Number
 * Other
 */
export const getFigmaVariables = async () => {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();

  return await Promise.all(
    collections.map(
      async (variableCollection) =>
        await Promise.all(
          variableCollection.variableIds.map(async (variableId) => {
            const variable = await figma.variables.getVariableByIdAsync(
              variableId
            );

            return variableCollection.modes.map(({ modeId }) => {
              const variableKeys = variable?.name.split("/");

              if (!variableKeys) {
                throw new Error("Invalid variable name");
              }

              switch (variable?.resolvedType) {
                case "COLOR":
                  return variableKeys.reduceRight((result, key) => {
                    if (Object.keys(result).length === 0) {
                      return {
                        [key]: { value: variable.valuesByMode[modeId] },
                      };
                    }

                    return { [key]: result };
                  }, {});

                case "BOOLEAN":
                  return variableKeys.reduceRight((result, key) => {
                    if (Object.keys(result).length === 0) {
                      return {
                        [key]: { value: variable.valuesByMode[modeId] },
                      };
                    }

                    return { [key]: result };
                  }, {});

                case "STRING":
                  return variableKeys.reduceRight((result, key) => {
                    if (Object.keys(result).length === 0) {
                      return {
                        [key]: { value: variable.valuesByMode[modeId] },
                      };
                    }

                    return { [key]: result };
                  }, {});

                case "FLOAT":
                  return variableKeys.reduceRight((result, key) => {
                    if (Object.keys(result).length === 0) {
                      return {
                        [key]: { value: variable.valuesByMode[modeId] },
                      };
                    }

                    return { [key]: result };
                  }, {});

                default:
                  console.log("unknown type", variable?.resolvedType);
              }

              return;
            });
          })
        )
    )
  );
};
