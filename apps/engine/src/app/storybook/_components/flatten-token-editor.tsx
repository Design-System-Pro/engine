'use client';

import React, { useState, useCallback, useMemo } from 'react';
import debounce from 'debounce';
import { Input, LucideIcons } from '@ds-project/components';
import { Label } from '@ds-project/components';
import { Button } from '@ds-project/components';
import { ScrollArea } from '@ds-project/components';
import { Card, CardContent } from '@ds-project/components';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@ds-project/components';
import { Checkbox } from '@ds-project/components';
import type { Group } from '@terrazzo/token-tools';

type TokenValue = string | number | { value: number; unit: string } | object;

interface FlatToken {
  path: string[];
  type: string;
  value: TokenValue;
  description: string;
}

interface TokenEditorGridProps {
  tokens: Group;
  onChange: (updatedTokens: Group) => void;
}

const flattenTokens = (obj: Group, path: string[] = []): FlatToken[] => {
  let result: FlatToken[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const newPath = [...path, key];
    if (value.$type && value.$value !== undefined) {
      result.push({
        path: newPath,
        type: value.$type,
        value: value.$value,
        description: value.$description || '',
      });
    } else if (typeof value === 'object') {
      result = result.concat(flattenTokens(value, newPath));
    }
  }
  return result;
};

const unflattenTokens = (
  flatTokens: FlatToken[],
  originalStructure: Group
): Group => {
  const result = JSON.parse(JSON.stringify(originalStructure));

  flatTokens.forEach((token) => {
    let current = result;
    for (let i = 0; i < token.path.length - 1; i++) {
      current = current[token.path[i]];
    }
    current[token.path[token.path.length - 1]].$value = token.value;
  });

  return result;
};

export const TokenEditorGrid: React.FC<TokenEditorGridProps> = ({
  tokens,
  onChange,
}) => {
  const [flatTokens, setFlatTokens] = useState<FlatToken[]>(
    flattenTokens(tokens)
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());

  const debouncedUpdateTokens = useMemo(
    () =>
      debounce((newTokens: FlatToken[]) => {
        const updatedTokens = unflattenTokens(newTokens, tokens);
        onChange(updatedTokens);
      }, 300),
    [tokens, onChange]
  );

  const debouncedSetFlatTokens = useMemo(
    () => debounce(setFlatTokens, 300),
    []
  );

  const handleTokenChange = useCallback(
    (path: string[], newValue: TokenValue) => {
      const updateTokens = (prevTokens: FlatToken[]) => {
        const newTokens = prevTokens.map((token) =>
          token.path.join('.') === path.join('.')
            ? { ...token, value: newValue }
            : token
        );
        debouncedUpdateTokens(newTokens);
        return newTokens;
      };

      // Update state through debounced function
      debouncedSetFlatTokens(updateTokens);
    },
    [debouncedUpdateTokens, debouncedSetFlatTokens]
  );

  const categories = useMemo(() => {
    const cats = new Set<string>();
    flatTokens.forEach((token) => {
      if (token.path.length > 1) {
        cats.add(token.path[0]);
      }
    });
    return Array.from(cats);
  }, [flatTokens]);

  const tokenTypes = useMemo(() => {
    const types = new Set<string>();
    flatTokens.forEach((token) => {
      types.add(token.type);
    });
    return Array.from(types);
  }, [flatTokens]);

  const filteredTokens = useMemo(() => {
    return flatTokens.filter(
      (token) =>
        (token.path
          .join('.')
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
          String(token.value)
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) &&
        (selectedTypes.size === 0 || selectedTypes.has(token.type))
    );
  }, [flatTokens, searchTerm, selectedTypes]);

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(type)) {
        newSet.delete(type);
      } else {
        newSet.add(type);
      }
      return newSet;
    });
  };

  const renderTokenInput = (token: FlatToken) => {
    const label = token.path.join(' > ');
    if (token.type === 'color') {
      return (
        <Card key={token.path.join('.')} className="mb-4">
          <CardContent className="p-4">
            <div className="mb-2 flex items-center gap-2">
              <div
                className="size-8 rounded border"
                style={{ backgroundColor: token.value as string }}
              />
              <Label className="font-medium">{label}</Label>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="color"
                value={token.value as string}
                onChange={(e) => handleTokenChange(token.path, e.target.value)}
                className="h-8 w-12 rounded p-0.5"
              />
              <Input
                type="text"
                value={token.value as string}
                onChange={(e) => handleTokenChange(token.path, e.target.value)}
                className="h-8 grow"
              />
            </div>
          </CardContent>
        </Card>
      );
    } else if (token.type === 'dimension') {
      const dimensionValue = token.value as { value: number; unit: string };
      return (
        <Card key={token.path.join('.')} className="mb-4">
          <CardContent className="p-4">
            <Label className="mb-2 block font-medium">{label}</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={dimensionValue.value}
                onChange={(e) =>
                  handleTokenChange(token.path, {
                    ...dimensionValue,
                    value: parseFloat(e.target.value),
                  })
                }
                className="h-8 grow"
              />
              <Input
                type="text"
                value={dimensionValue.unit}
                onChange={(e) =>
                  handleTokenChange(token.path, {
                    ...dimensionValue,
                    unit: e.target.value,
                  })
                }
                className="h-8 w-20"
              />
            </div>
          </CardContent>
        </Card>
      );
    } else {
      return (
        <Card key={token.path.join('.')} className="mb-4">
          <CardContent className="p-4">
            <Label className="mb-2 block font-medium">{label}</Label>
            <Input
              type="text"
              value={token.value as string}
              onChange={(e) => handleTokenChange(token.path, e.target.value)}
              className="h-8 w-full"
            />
          </CardContent>
        </Card>
      );
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Token Editor</h1>
      <div className="relative mb-4">
        <Input
          type="text"
          placeholder="Search tokens..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <LucideIcons.Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>
      <div className="mb-4">
        <h2 className="mb-2 text-lg font-semibold">Filter by Type:</h2>
        <div className="flex flex-wrap gap-4">
          {tokenTypes.map((type) => (
            <div key={type} className="flex items-center">
              <Checkbox
                id={`type-${type}`}
                checked={selectedTypes.has(type)}
                onCheckedChange={() => handleTypeToggle(type)}
              />
              <label
                htmlFor={`type-${type}`}
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>
      <Tabs defaultValue={categories[0]} className="w-full">
        <TabsList className="mb-4">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <ScrollArea className="h-[600px] w-full">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredTokens
                  .filter((token) => token.path[0] === category)
                  .map(renderTokenInput)}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
      <Button
        onClick={() =>
          console.log(
            JSON.stringify(unflattenTokens(flatTokens, tokens), null, 2)
          )
        }
        className="mt-4"
      >
        Log Edited Tokens
      </Button>
    </div>
  );
};
