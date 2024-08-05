import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ds-project/components';
import { FilesForm } from './_components/files-form';

export default function Files() {
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
      </CardContent>
    </Card>
  );
}
