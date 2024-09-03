'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Icons,
  Input,
  Text,
} from '@ds-project/components';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { revokeApiKeyAction } from '../_actions/revoke-api-key';

export function RevokeApiKeyDialog({ apiKeyId }: { apiKeyId: string }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await revokeApiKeyAction(new FormData(event.currentTarget));

    setIsVisible(false);
  };

  return (
    <Dialog open={isVisible} onOpenChange={setIsVisible}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Revoke key">
          <Icons.TrashIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Revoke API key?</DialogTitle>
            <DialogDescription className="space-y-2">
              <Text>
                <span>
                  This action will revoke the API key. You will not be able to
                  use it to access the API anymore. Make sure there's no
                  applications depending on it.
                </span>
              </Text>
            </DialogDescription>
          </DialogHeader>
          <div>
            <Input
              hidden
              value={apiKeyId}
              placeholder="Secret ID"
              name="apiKeyId"
            />
          </div>
          <DialogFooter>
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
