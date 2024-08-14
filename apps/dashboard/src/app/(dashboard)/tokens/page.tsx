import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Text,
} from '@ds-project/components';
import { equals } from 'rambda';
import { DiffBlock } from '@/components/diff-block/diff-block';
import { requestTokens } from '../integrations/providers/github/_actions';
import { fetchTokens } from './_actions';
import { PushButton } from './_components';

export default async function Tokens() {
  const tokens = await fetchTokens();
  const githubTokens = await requestTokens();

  const areTokensEqual = equals(tokens, githubTokens);

  return (
    <main className="flex min-h-screen w-full flex-col items-center p-24">
      <Card className="w-full">
        <CardHeader>
          <CardTitle size="2xl" weight="medium">
            <h1>Tokens</h1>
          </CardTitle>
          <CardDescription>
            <p>
              This is a list of all tokens used in Figma converted to Style
              Dictionary format.
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {Boolean(tokens) && Boolean(githubTokens) ? (
            <DiffBlock
              newValue={JSON.stringify(tokens, null, 2)}
              oldValue={JSON.stringify(githubTokens, null, 2)}
            />
          ) : (
            <Text>
              <p>No tokens found</p>
            </Text>
          )}
        </CardContent>
        <CardFooter className="justify-end">
          {!areTokensEqual && tokens ? <PushButton tokens={tokens} /> : null}
        </CardFooter>
      </Card>
    </main>
  );
}
