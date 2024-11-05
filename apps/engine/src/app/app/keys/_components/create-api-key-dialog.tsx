'use client';

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Icons,
  Input,
  Text,
} from '@ds-project/components/server';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ds-project/components/client';
import { createApiKeyAction } from '../_actions/create-api-key';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { CopyToClipboard } from '@/components';

export function CreateApiKeyDialog() {
  const [isVisible, setIsVisible] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const apiKeyInfo = await createApiKeyAction(
      new FormData(event.currentTarget)
    );

    if (apiKeyInfo?.data?.status === 'success') {
      setApiKey(apiKeyInfo.data.apiKey);
    }
  };

  return (
    <Dialog open={isVisible} onOpenChange={setIsVisible}>
      <DialogTrigger asChild>
        <Button>Create new API Key</Button>
      </DialogTrigger>
      <DialogContent>
        {apiKey ? (
          <CopyToClipboard content={apiKey} />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Create new API Key</DialogTitle>
              <DialogDescription className="space-y-2">
                <Text>
                  <span>
                    Create a new API key to access the API. An API key is a
                    unique identifier that is used to authenticate your requests
                    to the API.
                  </span>
                </Text>
                <Alert variant="info">
                  <Icons.QuestionMarkCircledIcon className="ds-size-4" />
                  <AlertTitle>Access level</AlertTitle>
                  <AlertDescription>
                    An API key has the same level of access as your account.
                  </AlertDescription>
                </Alert>
              </DialogDescription>
            </DialogHeader>
            <div>
              <Input placeholder="Description" name="description" />
            </div>
            <DialogFooter>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
