import type { DesignToken } from 'style-dictionary/types';
import { toHex } from 'color2k';
import type { FigmaExtractedVariable } from '../types';

const convertChannel = (value: number): number => {
  return Math.round(value * 255);
};

const toRgba = (value: RGB | RGBA): string => {
  if ('a' in value) {
    // RGBA
    return `rgba(${convertChannel(value.r)},${convertChannel(value.g)},${convertChannel(value.b)},${convertChannel(value.a)})`;
  }

  // RGB
  return `rgb(${convertChannel(value.r)},${convertChannel(value.g)},${convertChannel(value.b)})`;
};

export function extractColor(
  variable: FigmaExtractedVariable,
  modeId: string
): DesignToken {
  const value = variable.valuesByMode[modeId];

  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    // We should not receive these types under color. If that happens, something went wrong during the extraction from Figma.
    throw new Error('Unexpected color type');
  }

  const extractedValue = (() => {
    if ('a' in value || 'r' in value) {
      // RGB | RGBA
      return toHex(toRgba(value));
    }

    if ('id' in value) {
      // VariableAlias
      return value.id;
    }
  })();

  return {
    $type: 'color',
    $description: variable.description,
    $value: extractedValue,
  };
}
