import { Text } from '@ds-project/components';
import { JsonBlock, MainContent } from '@/components';
import { fetchTokens } from '../_actions';

export default async function Tokens() {
  const figmaVariables = await fetchTokens();

  if (!figmaVariables) {
    return (
      <Text>
        <p>Error fetching variables</p>
      </Text>
    );
  }

  return (
    <MainContent
      description="Compare the extraction from Figma Variables to the conversion to Design Tokens"
      title="Design Tokens"
    >
      <div className="flex flex-col gap-4">
        <JsonBlock src={figmaVariables} />
      </div>
    </MainContent>
  );
}
