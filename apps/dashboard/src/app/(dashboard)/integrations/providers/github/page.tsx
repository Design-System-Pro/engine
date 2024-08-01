import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Text,
} from '@ds-project/components';
import { JsonBlock } from '@/components';
import { requestTokens } from './request-tokens.action';

export default async function Tokens() {
  const tokens = await requestTokens();
  return (
    <main className="flex min-h-screen w-full flex-col items-center p-24">
      <Card className="w-full">
        <CardHeader>
          <CardTitle size="2xl" weight="medium">
            <h1>GitHub Tokens</h1>
          </CardTitle>
          <CardDescription>
            <p>This is the tokens stored in Github</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {tokens ? (
            <JsonBlock src={tokens} />
          ) : (
            <Text>
              <p>No tokens found</p>
            </Text>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
