import { DesignToken } from 'style-dictionary/types';
import { toHex } from 'color2k';
import { FigmaExtractedVariable } from '../types';

export function extractBoolean(
  value: FigmaExtractedVariable['valuesByMode'][string]
): DesignToken['$value'] {
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    (typeof value === 'object' && ('b' in value || 'id' in value))
  ) {
    // string | number | RGB | RGBA | VariableAlias
    // We should not receive these types under boolean. If that happens, something went wrong during the extraction from Figma.
    throw new Error('Unexpected boolean type');
  }

  throw new Error('Boolean extraction is not yet implemented');
}
