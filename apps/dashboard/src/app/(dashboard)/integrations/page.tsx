import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ds-project/components';
import { GithubProvider } from './providers/github/_components';
import { FigmaProvider } from './providers/figma/_components';

export default function Page() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle size="2xl" weight="medium">
          <h1>Integrations</h1>
        </CardTitle>
        <CardDescription>
          <p>Authorize and manage integrations</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <GithubProvider />
        <FigmaProvider />
      </CardContent>
    </Card>
  );
}
