import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@ds-project/components/client';
import { Button, Icons } from '@ds-project/components/server';
import type { ReactNode } from 'react';

interface IntegrationSettingsProps {
  isEnabled: boolean;
  onEnabledChange: (enabled: boolean) => void;

  name: string;
  integrationLogo: ReactNode;

  children: ReactNode;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function IntegrationSettings({
  integrationLogo,
  name,
  isEnabled,
  onEnabledChange,
  children,
  isOpen,
  onOpenChange,
}: IntegrationSettingsProps) {
  return (
    <>
      {isEnabled ? (
        <>
          <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetTrigger asChild>
              <Button variant="outline" className="space-x-2">
                <Icons.GearIcon />
                <span>Settings</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
              <SheetHeader>
                <div className="flex items-center gap-2">
                  {integrationLogo}
                  <SheetTitle>Integration settings</SheetTitle>
                </div>
                <SheetTitle>{name}</SheetTitle>
                <SheetDescription>Configure integration</SheetDescription>
              </SheetHeader>
              {children}
            </SheetContent>
          </Sheet>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Disconnect</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  We will disconnect the integration with {name}. You may need
                  to reconfigure settings if you decide to reconnect this
                  integration later.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={() => {
                    onEnabledChange(false);
                  }}
                >
                  Disconnect
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      ) : (
        <Button onClick={() => onEnabledChange(true)}>Connect</Button>
      )}
    </>
  );
}
