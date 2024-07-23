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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Integrations</CardTitle>
        <CardDescription>Authorize and manage integrations</CardDescription>
      </CardHeader>
      <CardContent>
        <GithubProvider />
      </CardContent>
    </Card>
  );
}
