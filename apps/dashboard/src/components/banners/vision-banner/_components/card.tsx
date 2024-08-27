import { Text } from '@ds-project/components';

interface CardProps {
  title: string;
  description: string;
}
export function Card({ description, title }: CardProps) {
  return (
    <div className="h-full p-4 rounded-md border bg-white border-zinc-300 flex gap-4 flex-col">
      <div className="w-full h-44 bg-zinc-800 rounded-md"></div>
      <Text size="base" weight="medium" leading="tight">
        <h2>{title}</h2>
      </Text>
      <Text size="sm" weight="light" leading="loose">
        <p>{description}</p>
      </Text>
    </div>
  );
}
