import { Text } from '@ds-project/components/server';
import { AspectRatio } from '@ds-project/components/client';
import Image from 'next/image';
import type { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface CardProps {
  title: string;
  description: string;
  coverImage: StaticImport;
}
export function Card({ description, title, coverImage }: CardProps) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-md border border-zinc-300 bg-white p-4">
      <AspectRatio
        ratio={16 / 9}
        className="h-44 w-full overflow-hidden rounded-md"
      >
        <Image
          src={coverImage}
          fill
          alt="json file representing the design tokens"
        />
      </AspectRatio>

      <Text size="base" weight="medium" leading="tight">
        <h2>{title}</h2>
      </Text>
      <Text size="sm" weight="light" leading="loose">
        <p>{description}</p>
      </Text>
    </div>
  );
}
