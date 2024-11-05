import { Icons, Text } from '@ds-project/components';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/button';
import { config } from '@/config';

export function CommunityBanner() {
  return (
    <article
      id="community"
      className="relative flex w-full flex-col gap-4 overflow-hidden rounded-md border border-zinc-600 bg-zinc-900 p-10 text-zinc-50"
    >
      <header>
        <Text size="lg">
          <h3>Join the community</h3>
        </Text>
      </header>
      <div className="flex gap-2">
        <Button asChild>
          <Link href={config.communityInviteUrl}>
            <Icons.DiscordLogoIcon className="mr-2" /> Join our Discord
          </Link>
        </Button>
        <Button asChild mode="dark">
          <Link href="https://github.com/Design-System-Project/platform">
            <Icons.GitHubLogoIcon className="mr-2" /> Star us on GitHub
          </Link>
        </Button>
      </div>
      <Image
        src="/img/discord.svg"
        alt=""
        width={128}
        height={97}
        className="absolute -bottom-12 -right-14 size-80 opacity-35"
      />
    </article>
  );
}
