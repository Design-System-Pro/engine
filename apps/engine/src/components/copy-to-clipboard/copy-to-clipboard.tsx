'use client';

import { Button, cn, Icons, useToast } from '@ds-project/components';

interface CopyToClipboardProps {
  content: string;
  className?: string;
}

export function CopyToClipboard(
  { content, className }: CopyToClipboardProps = { content: 'Default content' }
) {
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: 'Copied!',
        description: 'API key has been copied to your clipboard.',
      });
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast({
        title: 'Copy failed',
        description: 'There was an error copying to the clipboard.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Button
      variant="outline"
      className={cn('overflow-hidden', className)}
      onClick={copyToClipboard}
    >
      <span className="truncate">{content}</span>
      <Icons.CopyIcon className="h-4 w-4 flex-shrink-0" />
    </Button>
  );
}
