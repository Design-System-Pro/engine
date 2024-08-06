import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Text,
} from '@ds-project/components';
import { formatDistance, subDays } from 'date-fns';
import { JsonBlock } from '@/components';
import { getFile } from './_actions/file.action';

export default async function Page({ params }: { params: { fileId: string } }) {
  const file = await getFile(params.fileId);

  const lastModifiedDistance = file?.lastModified
    ? formatDistance(subDays(file.lastModified, 3), new Date(), {
        addSuffix: true,
      })
    : null;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle size="2xl" weight="medium">
          <h1>{file?.name}</h1>
        </CardTitle>
        <CardDescription>
          <p>{`Last modified: ${lastModifiedDistance ? lastModifiedDistance : 'Unknown'}`}</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {file?.designTokens ? (
          <JsonBlock src={file.designTokens} />
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
              <code>{params.fileId}</code>
              <br /> under collection <br />
              <code>__config__</code>,<br /> is set in your file.
            </p>
          </Text>
        )}
      </CardContent>
    </Card>
  );
}
