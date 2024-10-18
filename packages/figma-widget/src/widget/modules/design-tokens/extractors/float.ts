import type {
  AliasValue,
  Dimension,
  FontWeight,
  JSONTokenTree,
  Number,
} from 'design-tokens-format-module';
import { extractAlias } from './extract-alias';
import { config } from '../../../config';
import { tokenizeVariable } from '../utils/tokenize-variable';

export async function extractFloat(
  variable: Variable,
  modeId: string
): Promise<JSONTokenTree> {
  const value = variable.valuesByMode[modeId];

  if (
    typeof value === 'string' ||
    typeof value === 'boolean' ||
    (typeof value === 'object' && 'b' in value)
  ) {
    // string | boolean | RGB | RGBA | VariableAlias
    // We should not receive these types under float. If that happens, something went wrong during the extraction from Figma.
    throw new Error('Unexpected float type');
  }

  if (
    variable.scopes.includes('FONT_WEIGHT') ||
    variable.scopes.includes('FONT_STYLE')
  ) {
    let $value: number | AliasValue;

    if (typeof value === 'object' && 'id' in value) {
      $value = await extractAlias(value.id, modeId);
    } else {
      $value = value;
    }

    const token = {
      $type: 'fontWeight',
      $value,
      $description: variable.description,
      $extensions: {
        [config.extensionPluginKey]: {
          scopes: variable.scopes,
        },
      },
    } satisfies FontWeight.Token;

    return tokenizeVariable(variable.name)(token);
  }

  if (
    variable.scopes.includes('LINE_HEIGHT') ||
    variable.scopes.includes('LETTER_SPACING') ||
    variable.scopes.includes('PARAGRAPH_SPACING') ||
    variable.scopes.includes('PARAGRAPH_INDENT') ||
    variable.scopes.includes('OPACITY') ||
    variable.scopes.includes('CORNER_RADIUS') ||
    variable.scopes.includes('EFFECT_FLOAT') ||
    variable.scopes.includes('STROKE_FLOAT')
  ) {
    let $value: number | AliasValue;

    if (typeof value === 'object' && 'id' in value) {
      $value = await extractAlias(value.id, modeId);
    } else {
      $value = value;
    }

    const token = {
      $type: 'number',
      $value,
      $description: variable.description,
      $extensions: {
        [config.extensionPluginKey]: {
          scopes: variable.scopes,
        },
      },
    } satisfies Number.Token;

    return tokenizeVariable(variable.name)(token);
  }

  if (
    variable.scopes.includes('FONT_SIZE') ||
    variable.scopes.includes('GAP') ||
    variable.scopes.includes('WIDTH_HEIGHT') ||
    variable.scopes.includes('ALL_SCOPES')
  ) {
    let $value: Dimension.RawValue | AliasValue;

    if (typeof value === 'object' && 'id' in value) {
      $value = await extractAlias(value.id, modeId);
    } else {
      $value = `${value}px`;
    }

    const token = {
      $type: 'dimension',
      $value,
      $description: variable.description,
      $extensions: {
        [config.extensionPluginKey]: {
          scopes: variable.scopes,
        },
      },
    } satisfies Dimension.Token;

    return tokenizeVariable(variable.name)(token);
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
