'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ds-project/components';
import { useCallback, useEffect, useState } from 'react';
import type { JSONTokenTree } from 'design-tokens-format-module';
import { InstallRelease, JsonBlock } from '@/components';
import type { fetchReleases } from '../_actions';
import { fetchReleaseTokens } from '../_actions/fetch-release-tokens.action';

interface SelectReleasesProps {
  releases: Awaited<ReturnType<typeof fetchReleases>>;
}

export function SelectReleases({ releases }: SelectReleasesProps) {
  const [selectedRelease, setSelectedRelease] =
    useState<NonNullable<SelectReleasesProps['releases']>[number]>();
  const [tokens, setTokens] = useState<JSONTokenTree>();

  const onReleaseChange = useCallback(
    (selectedReleaseId: string) => {
      const newSelectedRelease = releases?.find(
        (release) => String(release.id) === selectedReleaseId
      );
      setSelectedRelease(newSelectedRelease);
    },
    [releases]
  );

  useEffect(() => {
    if (!selectedRelease?.id) return;

    fetchReleaseTokens(selectedRelease.id)
      .then((_tokens) => {
        if (!_tokens) return;

        setTokens(_tokens);
      })
      .catch((error) => {
        console.error('Error fetching release tokens', error);
      });
  }, [selectedRelease?.id]);

  return (
    <>
      <div className="flex justify-between">
        <Select
          onValueChange={onReleaseChange}
          value={selectedRelease?.id.toString()}
        >
          <SelectTrigger className="max-w-sm">
            <SelectValue placeholder="Release" />
          </SelectTrigger>
          <SelectContent>
            {releases?.map((release) => (
              <SelectItem key={release.id} value={String(release.id)}>
                {release.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedRelease?.name ? (
          <InstallRelease packageName={selectedRelease.name} />
        ) : null}
      </div>
      {tokens ? <JsonBlock src={tokens} /> : null}
    </>
  );
}
