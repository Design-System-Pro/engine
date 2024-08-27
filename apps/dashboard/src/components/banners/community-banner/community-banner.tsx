import { Icons, Text } from '@ds-project/components';
import Link from 'next/link';
import Image from 'next/image';
import discordIcon from './discord-icon.png';
import { Button } from '@/components/button';

export function CommunityBanner() {
  return (
    <article
      id="community"
      className="relative overflow-hidden flex flex-col gap-4 border border-zinc-600 rounded-md p-10 bg-zinc-900 text-zinc-50"
    >
      <header>
        <Text size="lg">
          <h3>Join the community</h3>
        </Text>
      </header>
      <div className="flex gap-2">
        <Button asChild>
          <Link href="https://discord.gg/AKza6Mqr">
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
        src={discordIcon}
        alt=""
        className="object-cover absolute size-64 -right-0 -top-10"
      />
    </article>
  );
}
