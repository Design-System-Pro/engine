import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Text,
} from '@ds-project/components';
import { JsonBlock } from '@/components';
import { getTokens } from './tokens.actions';

export default async function Tokens() {
  const tokens = await getTokens();
  return (
    <main className="flex min-h-screen w-full flex-col items-center p-24">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <Text size="4xl" weight="medium">
              <h1>Tokens</h1>
            </Text>
          </CardTitle>
          <CardDescription>
            <Text size="base">
              <p>
                This is a list of all tokens used in Figma converted to Style
                Dictionary format.
              </p>
            </Text>
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
