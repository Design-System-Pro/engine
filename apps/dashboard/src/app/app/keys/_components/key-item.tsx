import { Text } from '@ds-project/components';
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
    <div className="border border-gray-200 bg-white p-4 rounded-md flex justify-between items-center">
      <Text>
        <span>{userDescription}</span>
      </Text>
      <RevokeApiKeyDialog keyId={id} />
    </div>
  );
}
