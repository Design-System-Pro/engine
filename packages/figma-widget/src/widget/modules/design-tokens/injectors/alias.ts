import { Token } from '@terrazzo/token-tools';
import { expandTokenName } from '../utils/expand-token-name';

export async function assignAlias({
  modeId,
  token,
  variable,
  localVariables,
}: {
  variable: Variable;
  modeId: string;
  token: Token;
  localVariables: Variable[];
}): Promise<Variable> {
  if (typeof token.$value !== 'string') {
    throw new Error('Alias token value must be a string');
  }

  const { tokenPath } = expandTokenName(token.$value);
  const alias = localVariables.find((variable) => variable.name === tokenPath);

  if (alias?.id) {
    variable.setValueForMode(modeId, {
      type: 'VARIABLE_ALIAS',
      id: alias.id,
    });
  }

  return variable;
}
