import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ds-project/components/server';
import { ResourcesList } from './_components/resources-list';
import { getResources } from './_actions/resources.action';

export default async function Page() {
  const tokens = await getResources();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle size="2xl" weight="medium">
          <h1>Figma Tokens</h1>
        </CardTitle>
        <CardDescription>
          <p>Connect your tokens</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ResourcesList resources={tokens} />
      </CardContent>
    </Card>
  );
}
