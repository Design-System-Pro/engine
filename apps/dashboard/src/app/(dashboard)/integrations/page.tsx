import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ds-project/components';
import { GithubProvider } from './providers/github/provider';
import { FigmaProvider } from './providers/figma/provider';

export default function Page() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center p-24">
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
    </main>
  );
}
