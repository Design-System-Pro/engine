import type {
  AliasValue,
  FontFamily,
  FontWeight,
  fontWeightValues,
  JSONTokenTree,
} from 'design-tokens-format-module';
import { extractAlias } from './extract-alias';
import { config } from '../../../config';
import { tokenizeVariable } from '../utils/tokenize-variable';

export async function extractString(
  variable: Variable,
  modeId: string
): Promise<JSONTokenTree> {
  const value = variable.valuesByMode[modeId];

  if (
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    (typeof value === 'object' && 'b' in value)
  ) {
    // number | boolean | RGB | RGBA | VariableAlias
    // We should not receive these types under string. If that happens, something went wrong during the extraction from Figma.
    throw new Error('Unexpected string type');
  }

  let stringOrAlias;

  if (typeof value === 'object' && 'id' in value) {
    stringOrAlias = await extractAlias(value.id, modeId);
  } else {
    stringOrAlias = value;
  }

  if (!stringOrAlias) {
    // We should not receive these types under string. If that happens, something went wrong during the extraction from Figma.
    throw new Error('Unexpected string value');
  }

  if (
    variable.scopes.includes('FONT_FAMILY') &&
    typeof stringOrAlias === 'string'
  ) {
    let $value: string;

    if (typeof value === 'object' && 'id' in value) {
      $value = await extractAlias(value.id, modeId);
    } else {
      $value = value;
    }

    return tokenizeVariable(variable.name)({
      $type: 'fontFamily',
      $value,
      $description: variable.description,
      $extensions: {
        [config.extensionPluginKey]: {
          [config.extensionFigmaOriginKey]: {
            scopes: variable.scopes,
          },
        },
      },
    } satisfies FontFamily.Token);
  }

  if (
    variable.scopes.includes('FONT_WEIGHT') ||
    variable.scopes.includes('FONT_STYLE')
  ) {
    let $value: (typeof fontWeightValues)[number] | AliasValue;

    if (typeof value === 'object' && 'id' in value) {
      $value = await extractAlias(value.id, modeId);
    } else {
      $value = value as (typeof fontWeightValues)[number];
    }

    return tokenizeVariable(variable.name)({
      $type: 'fontWeight',
      $value,
      $description: variable.description,
      $extensions: {
        [config.extensionPluginKey]: {
          scopes: variable.scopes,
        },
      },
    } satisfies FontWeight.Token);
  }

  // Any other scope by default will be a dimension

  let floatOrAlias: Dimension.Value | undefined;

  if (typeof value === 'object' && 'id' in value) {
    floatOrAlias = await extractAlias(value.id, modeId);
  } else {
    floatOrAlias = `${value}px`;
  }

  const token = {
    $type: 'dimension',
    $value: floatOrAlias,
    $description: variable.description,
    $extensions: {
      [config.extensionPluginKey]: {
        scopes: variable.scopes,
      },
    },
  } satisfies Dimension.Token;

  return tokenizeVariable(variable.name)(token);
}
