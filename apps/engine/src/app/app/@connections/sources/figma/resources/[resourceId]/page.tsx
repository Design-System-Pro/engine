import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Text,
} from '@ds-project/components/server';
import { JsonBlock } from '@/components';
import { getResource } from './_actions/resource.action';

export default async function Page(props: {
  params: Promise<{ resourceId: string }>;
}) {
  const params = await props.params;
  const resource = await getResource(params.resourceId);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle size="2xl" weight="medium">
          <h1>{resource?.name}</h1>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {resource?.designTokens ? (
          <JsonBlock src={resource.designTokens} />
        ) : (
          <Text>
            <p>
              No tokens available.
              <br />
              Make sure a variable
              <br />
              <code>fileId</code>
              <br />
              with value <br />
              <code>{params.resourceId}</code>
              <br /> under collection <br />
              <code>__config__</code>,<br /> is set in your file.
            </p>
          </Text>
        )}
      </CardContent>
    </Card>
  );
}
