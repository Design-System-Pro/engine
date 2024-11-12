import type { ColorToken } from '@terrazzo/token-tools';

export function rgbToHex({
  r,
  g,
  b,
  ...rest
}: RGB | RGBA): ColorToken['$value'] {
  const a = 'a' in rest ? rest.a : 1;

  const toHex = (value: number) => {
    const hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  const hex = [toHex(r), toHex(g), toHex(b), a !== 1 ? toHex(a) : ''].join('');
  return `#${hex}`;
}
