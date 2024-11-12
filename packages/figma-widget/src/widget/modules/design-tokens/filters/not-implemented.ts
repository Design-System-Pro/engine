import type { FigmaExtractedVariable } from '../types';

export function notImplemented(variable: FigmaExtractedVariable) {
  switch (variable.resolvedType) {
    case 'COLOR':
    case 'FLOAT':
      return true;
    case 'BOOLEAN':
    case 'STRING':
    default:
      return false;
  }
}
