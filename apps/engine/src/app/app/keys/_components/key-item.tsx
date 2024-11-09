import { Text } from '@ds-project/components/server';
import { RevokeApiKeyDialog } from './revoke-api-key-dialog';

export function KeyItem({
  id,
  description,
}: {
  id: string;
  description: string;
}) {
  // Extract the user description part without the UUID
  const userDescription = description.replace(/^([\da-f-]+-)+/, '');

  return (
    <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white p-4">
      <Text>
        <span>{userDescription}</span>
      </Text>
      <RevokeApiKeyDialog keyId={id} />
    </div>
  );
}
