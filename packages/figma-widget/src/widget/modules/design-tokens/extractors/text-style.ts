import { extractAlias } from './alias';
import type {
  AliasValue,
  TypographyToken,
  TypographyValue,
} from '@terrazzo/token-tools';
import { config } from '../../../config';
import { tokenizeVariable } from '../utils/tokenize-variable';

type BoundVariablesKeys = keyof NonNullable<TextStyle['boundVariables']>;
type BoundVariables = {
  [key in BoundVariablesKeys]?: AliasValue;
};

const transformLineHeight = (
  lineHeight: LineHeight
): TypographyValue['lineHeight'] => {
  switch (lineHeight.unit) {
    case 'PIXELS':
      return `${lineHeight.value}px`;

    case 'PERCENT':
      return lineHeight.value / 100;

    case 'AUTO':
    default:
      return undefined;
  }
};

export async function extractTextStyle(textStyle: TextStyle) {
  const variableAlias = await Object.entries(
    textStyle.boundVariables ?? {}
  ).reduce(
    async (accumulator, [key, value]) => {
      const alias = await extractAlias(value.id);
      return {
        ...(await accumulator),
        [key]: alias,
      };
    },
    Promise.resolve({} as BoundVariables)
  );

  const token = {
    $type: 'typography',
    $value: {
      fontFamily: variableAlias.fontFamily ?? textStyle.fontName.family,
      fontStyle: variableAlias.fontStyle ?? textStyle.fontName.style,
      fontWeight: variableAlias.fontWeight,
      fontSize: variableAlias.fontSize ?? {
        value: textStyle.fontSize,
        unit: 'px',
      },
      letterSpacing: variableAlias.letterSpacing ?? {
        value: textStyle.letterSpacing.value,
        unit: textStyle.letterSpacing.unit === 'PIXELS' ? 'px' : 'em',
      },
      lineHeight:
        variableAlias.lineHeight ?? transformLineHeight(textStyle.lineHeight),
    },
    $description: textStyle.description,
    $extensions: {
      [config.extensionPluginKey]: {},
    },
  } satisfies TypographyToken;

  return tokenizeVariable(textStyle.name)(token);
}
