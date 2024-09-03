import { JsonBlock, MainContent } from '@/components';
import { api } from '@ds-project/api/rsc';
import { KeyItem } from './_components/key-item';

import { CreateApiKeyDialog } from './_components/create-api-key-dialog';

export default async function Page() {
  const apiKeys = await api.apiKeys.all();

  return (
    <MainContent
      actions={<CreateApiKeyDialog />}
      description="Manage your API Keys."
      title="API Keys"
    >
      <div className="flex flex-col gap-4">
        {apiKeys.map(({ id, description }) => (
          <KeyItem key={id} id={id} name={description} />
        ))}

        <JsonBlock src={apiKeys} />
      </div>
    </MainContent>
  );
}
