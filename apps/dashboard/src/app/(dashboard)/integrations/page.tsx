import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ds-project/components';
import { GithubProvider } from './providers/github/provider';

export default function Page() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center p-24">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Integrations</CardTitle>
          <CardDescription>Authorize and manage integrations</CardDescription>
        </CardHeader>
        <CardContent>
          <GithubProvider />
        </CardContent>
      </Card>
    </main>
  );
}
