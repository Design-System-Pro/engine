import { extractAlias } from './alias';
import type {
  AliasValue,
  ShadowToken,
  ShadowValue,
} from '@terrazzo/token-tools';
import { config } from '../../../config';
import { tokenizeVariable } from '../utils/tokenize-variable';
import { rgbToHex } from '../transformers';

type BoundVariablesKeys = keyof NonNullable<DropShadowEffect['boundVariables']>;
type BoundVariables = {
  [key in BoundVariablesKeys]?: AliasValue;
};

const extractVariableAlias = async (
  boundVariables: DropShadowEffect['boundVariables']
) => {
  return await Object.entries(boundVariables ?? {}).reduce(
    async (accumulator, [key, value]) => {
      const alias = await extractAlias(value.id);
      return {
        ...(await accumulator),
        [key]: alias,
      };
    },
    Promise.resolve({} as BoundVariables)
  );
};

async function extractEffect(effect: Effect): Promise<ShadowValue | null> {
  switch (effect.type) {
    case 'INNER_SHADOW':
    case 'DROP_SHADOW': {
      const boundVariables = await extractVariableAlias(effect.boundVariables);
      return {
        offsetX: boundVariables.offsetX ?? {
          value: effect.offset.x,
          unit: 'px',
        },
        offsetY: boundVariables.offsetY ?? {
          value: effect.offset.y,
          unit: 'px',
        },
        color: boundVariables.color ?? rgbToHex(effect.color),
        ...(effect.spread
          ? {
              spread: boundVariables.spread ?? {
                value: effect.spread,
                unit: 'px',
              },
            }
          : {}),
        ...(effect.radius
          ? {
              blur: boundVariables.radius ?? {
                value: effect.radius,
                unit: 'px',
              },
            }
          : {}),
        inset: effect.type === 'INNER_SHADOW',
      } satisfies ShadowValue;
    }
    case 'BACKGROUND_BLUR':
    case 'LAYER_BLUR':
    default:
      return null;
  }
}

export async function extractEffectStyle(effectStyle: EffectStyle) {
  // reduceRight is used because for some reason figma order is reversed
  const effectValues = await effectStyle.effects.reduceRight(
    async (accumulator, effect) => {
      const effectToken = await extractEffect(effect);
      return effectToken ? [...(await accumulator), effectToken] : accumulator;
    },
    Promise.resolve([] as ShadowValue[])
  );

  console.log({ effects: effectStyle.effects });

  const token = {
    $type: 'shadow',
    $value: effectValues,
    $description: effectStyle.description,
    $extensions: {
      [config.extensionPluginKey]: {},
    },
  } satisfies ShadowToken;

  return tokenizeVariable(effectStyle.name)(token);
}
