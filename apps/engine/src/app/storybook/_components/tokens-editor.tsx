import type { ParseResult } from '@terrazzo/parser';
import { parse } from '@terrazzo/parser';
import { useEffect, useState } from 'react';
import { Chrome, Swatch, rgbaToHex, hexToHsva } from '@uiw/react-color';
import {
  Icons,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@ds-project/components';

export function TokensEditor({
  tokens,
  onTokensChange,
}: {
  tokens: object;
  onTokensChange: (props: ParseResult) => void;
}) {
  const [normalizedTokens, setNormalizedTokens] =
    useState<ParseResult['tokens']>();
  const [sources, setSources] = useState<ParseResult['sources']>();

  console.log({ normalizedTokens, sources });

  useEffect(() => {
    parse([
      {
        src: tokens,
      },
    ])
      .then((result) => {
        setNormalizedTokens(result.tokens);
        setSources(result.sources);
      })
      .catch(console.error);
  }, [tokens]);

  useEffect(() => {
    if (!normalizedTokens || !sources) return;

    onTokensChange({ tokens: normalizedTokens, sources });
  }, [normalizedTokens, onTokensChange, sources]);

  return Object.entries(normalizedTokens ?? {}).map(([key, value]) => {
    switch (value.$type) {
      case 'color': {
        const [r, g, b] = value.$value.channels.map((c) => Math.round(c * 255));
        const hexColor = rgbaToHex({ r, g, b, a: value.$value.alpha });
        const hsva = hexToHsva(hexColor);
        return (
          <div key={key} className="flex items-center gap-2">
            <Popover key={key}>
              <PopoverTrigger>
                <Swatch
                  colors={[hexColor]}
                  key={key}
                  color={hexColor}
                  rectProps={{
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid black',
                    },
                  }}
                />
              </PopoverTrigger>
              <PopoverContent>
                <Chrome
                  color={hsva}
                  className="[&>div:nth-child(1)]:hidden [&>div:nth-child(2)]:hidden"
                  onChange={(newColor) => {
                    console.log({ newColor });
                    setNormalizedTokens((prev) => ({
                      ...prev,
                      [key]: {
                        ...value,
                        $value: {
                          ...value.$value,
                          channels: [
                            newColor.rgba.r / 255,
                            newColor.rgba.g / 255,
                            newColor.rgba.b / 255,
                          ],
                          alpha: newColor.rgba.a,
                        },
                      },
                    }));
                  }}
                />
              </PopoverContent>
            </Popover>
            <Label>{key}</Label>
          </div>
        );
      }
      case 'dimension': {
        return (
          <div key={key} className="flex items-center gap-2">
            <Icons.SizeIcon />
            <span key={key}>{key}</span>
          </div>
        );
      }
      default:
        return null;
    }
  });
}
