import { AspectRatio, Text } from '@ds-project/components';
import Image from 'next/image';
import type { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface CardProps {
  title: string;
  description: string;
  coverImage: StaticImport;
}
export function Card({ description, title, coverImage }: CardProps) {
  return (
    <div className="h-full p-4 rounded-md border bg-white border-zinc-300 flex gap-4 flex-col">
      <AspectRatio
        ratio={16 / 9}
        className="w-full h-44 rounded-md overflow-hidden"
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
