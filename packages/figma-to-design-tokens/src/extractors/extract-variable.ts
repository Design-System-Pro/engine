import { DesignToken } from 'style-dictionary/types';
import { extractColor } from './color';
import { extractBoolean } from './boolean';
import { FigmaExtractedVariable } from '../types';
import { extractFloat } from './float';

export function extractVariable(
  variable: FigmaExtractedVariable,
  modeId: string
): DesignToken {
  switch (variable.resolvedType) {
    case 'COLOR':
      return extractColor(variable, modeId);
    case 'BOOLEAN':
      return extractBoolean(variable.valuesByMode[modeId]);
    case 'FLOAT':
      return extractFloat(variable, modeId);
    case 'STRING':
    default:
      return {};
  }
}
