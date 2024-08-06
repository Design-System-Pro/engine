import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Text,
} from '@ds-project/components';
import { JsonBlock } from '@/components';
import { requestTokens } from './_actions';

export default async function Tokens() {
  const tokens = await requestTokens();
  return (
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
  );
}
