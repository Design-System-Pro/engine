import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ds-project/components';
import { FilesForm } from './_components/files-form';
import { FilesList } from './_components/figma-files';
import { getFiles } from './_actions/files.action';

export default async function Page() {
  const files = await getFiles();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle size="2xl" weight="medium">
          <h1>Figma files</h1>
        </CardTitle>
        <CardDescription>
          <p>Connect your figma files</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FilesForm />
        <FilesList files={files} />
      </CardContent>
    </Card>
  );
}
