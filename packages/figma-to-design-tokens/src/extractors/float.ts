import { DesignToken } from 'style-dictionary/types';
import { FigmaExtractedVariable } from '../types';

const scopes = (_filterScopes: VariableScope[]) => (scope: VariableScope) => {
  return _filterScopes.includes(scope);
};

export function extractFloat(
  variable: FigmaExtractedVariable,
  modeId: string
): DesignToken['$value'] {
  const value = variable.valuesByMode[modeId];

  if (
    typeof value === 'string' ||
    typeof value === 'boolean' ||
    (typeof value === 'object' && ('b' in value || 'id' in value))
  ) {
    // string | boolean | RGB | RGBA | VariableAlias
    // We should not receive these types under float. If that happens, something went wrong during the extraction from Figma.
    throw new Error('Unexpected float type');
  }

  const extensions = {
    'pro.designsystemproject': {
      scopes: variable.scopes,
    },
  };

  if (
    variable.scopes.some(
      scopes([
        'CORNER_RADIUS',
        'GAP',
        'PARAGRAPH_INDENT',
        'PARAGRAPH_SPACING',
        'STROKE_FLOAT',
        'WIDTH_HEIGHT',
      ])
    )
  ) {
    return {
      $type: 'dimension',
      $value: `${value}px`,
      extensions,
    };
  }

  if (variable.scopes.every(scopes(['FONT_WEIGHT']))) {
    return {
      $type: 'fontWeight',
      $value: value,
      extensions,
    };
  }

  if (variable.scopes.every(scopes(['LETTER_SPACING']))) {
    return {
      $type: 'letterSpacing',
      $value: `${value}px`,
      extensions,
    };
  }

  if (variable.scopes.every(scopes(['LINE_HEIGHT']))) {
    return {
      $type: 'lineHeight',
      $value: `${value}px`,
      extensions,
    };
  }

  if (variable.scopes.every(scopes(['FONT_SIZE']))) {
    return {
      $type: 'fontSize',
      $value: `${value}px`,
      extensions,
    };
  }

  // All scopes

  return {
    $type: 'number',
    $value: value,
    extensions,
  };
}
