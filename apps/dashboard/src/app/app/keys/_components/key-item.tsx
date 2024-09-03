import { Text } from '@ds-project/components';
import { RevokeApiKeyDialog } from './revoke-api-key-dialog';

export function KeyItem({ id, name }: { id: string; name: string }) {
  return (
    <div className="border border-gray-200 bg-white p-4 rounded-md flex justify-between items-center">
      <Text>
        <span>{name}</span>
      </Text>
      <RevokeApiKeyDialog apiKeyId={id} />
    </div>
  );
}
