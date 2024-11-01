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
  Button,
  Icons,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Switch,
} from '@ds-project/components';
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
  const shouldIgnoreAlert = !isEnabled;
  return (
    <>
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          <Button variant="outline" className="space-x-2" disabled={!isEnabled}>
            <Icons.GearIcon />
            <span>Settings</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <SheetHeader>
            <div className="flex items-center gap-2">
              {integrationLogo}
              <SheetTitle>
                <h3>Integration settings</h3>
              </SheetTitle>
            </div>
            <SheetTitle>{name}</SheetTitle>
            <SheetDescription>Configure integration</SheetDescription>
          </SheetHeader>
          {children}
        </SheetContent>
      </Sheet>
      <AlertDialog open={shouldIgnoreAlert ? false : undefined}>
        <AlertDialogTrigger asChild>
          <span>
            <Switch
              checked={isEnabled}
              onCheckedChange={shouldIgnoreAlert ? onEnabledChange : undefined}
            />
          </span>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              We will disconnect the integration with {name}. You may need to
              reconfigure settings if you decide to reconnect this integration
              later.
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
  );
}
