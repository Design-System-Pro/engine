export async function extractAlias(
  variableId: string,
  modeId: string
): Promise<Variable | null> {
  const variable = await figma.variables.getVariableByIdAsync(variableId);

  const value = variable?.valuesByMode[modeId];

  if (typeof value === 'object' && 'id' in value) {
    return extractAlias(value.id, modeId);
  }

  return variable;
}
