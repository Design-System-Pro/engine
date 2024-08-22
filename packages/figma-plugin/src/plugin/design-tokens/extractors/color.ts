import type { DesignToken } from 'style-dictionary/types';
import { extractAlias } from './extract-alias';
import { rgbToHex } from '../../variables/utils/transformers/color';
import { tokenize } from '../utils/tokenize';

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

export async function extractColor(
  variable: Variable,
  modeId: string
): Promise<DesignToken> {
  const value = variable.valuesByMode[modeId];

  if (
    !value ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    // We should not receive these types under color. If that happens, something went wrong during the extraction from Figma.
    throw new Error('Unexpected color type');
  }

  let colorOrAlias: string | undefined;

  if ('a' in value || 'r' in value) {
    // RGB | RGBA
    colorOrAlias = rgbToHex(value);
  }

  if (typeof value === 'object' && 'id' in value) {
    // VariableAlias
    const aliasVariable = await extractAlias(value.id, modeId);
    colorOrAlias = `{${modeId}.${aliasVariable?.name.split('/').join('.')}}`;
  }

  return tokenize(
    modeId,
    variable.name
  )({
    $type: 'color',
    $description: variable.description,
    $value: colorOrAlias,
  });
}
