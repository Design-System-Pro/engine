import type { DesignToken } from 'style-dictionary/types';

export function rgbToHex({ r, g, b, ...rest }: RGB | RGBA) {
  const a = 'a' in rest ? rest.a : 1;

  const toHex = (value: number) => {
    const hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  const hex = [toHex(r), toHex(g), toHex(b)].join('');
  return `#${hex}${a !== 1 ? toHex(a) : ''}`;
}

function color(value: VariableValue): string {
  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'object' && 'a' in value) {
    return rgbToHex(value);
  }

  if (typeof value === 'object' && !('a' in value) && 'r' in value) {
    return rgbToHex(value);
  }

  if (
    typeof value === 'object' &&
    'type' in value &&
    value.type === 'VARIABLE_ALIAS'
  ) {
    console.error('Variable alias is still not implemented. Returning empty.');

    return '';
  }

  console.warn('Unexpected color value. Returning empty.');
  return '';
}

export function colorVariable({
  modeId,
  state,
  variable,
}: {
  variable: Variable;
  modeId: string;
  state?: PublishStatus;
}): DesignToken {
  if (variable.resolvedType !== 'COLOR') {
    console.error('variable is not a color variable. Returning empty.');
    return {};
  }

  const variableKeys = variable.name.split('/');

  const result = variableKeys.reduceRight((accumulator, variableKey) => {
    // Set the value at the lowest leaf of the structure
    if (Object.keys(accumulator).length === 0) {
      return {
        [variableKey]: {
          $value: color(variable.valuesByMode[modeId]),
          attributes: {
            modeId,
            state,
            hiddenFromPublishing: variable.hiddenFromPublishing,
          },
        },
      };
    }

    // Wrap the inner structure at an highest level leaf
    return { [variableKey]: accumulator };
  }, {});

  return result;
}
