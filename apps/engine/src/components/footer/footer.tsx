import {
  DSProIcon,
  Icons,
  RedditIcon,
  Text,
} from '@ds-project/components/server';
import { Button } from '../button';
import { CommunityBanner } from '../banners/community-banner';
import { config } from '@/config';
import { Link } from './_components/link';

export function Footer() {
  return (
    <footer className="flex w-full">
      <div className="flex w-full justify-center rounded-t-xl bg-zinc-950 py-16">
        <div className="mx-4 flex w-full max-w-screen-lg flex-col gap-6">
          <div className="flex w-full items-start justify-between gap-24">
            <div>
              <DSProIcon width={72} height={72} className="text-white" />
              <div className="flex gap-2">
                <Button asChild mode="dark" size="icon" title="GitHub">
                  <Link href={config.githubUrl}>
                    <Icons.GitHubLogoIcon />
                  </Link>
                </Button>
                <Button asChild mode="dark" size="icon" title="Reddit">
                  <Link href={config.redditUrl}>
                    <RedditIcon />
                  </Link>
                </Button>
                <Button asChild mode="dark" size="icon" title="Discord">
                  <Link href={config.communityInviteUrl}>
                    <Icons.DiscordLogoIcon />
                  </Link>
                </Button>
                <Button asChild mode="dark" size="icon" title="LinkedIn">
                  <Link href={config.linkedinUrl}>
                    <Icons.LinkedInLogoIcon />
                  </Link>
                </Button>
              </div>
            </div>
            <CommunityBanner />
          </div>
          <hr className="border-t-zinc-600" />
          <div className="flex justify-between text-zinc-600">
            <Text size="sm">
              <p>© {new Date().getFullYear()} DS Pro</p>
            </Text>
            {/* <Link href="/terms">Terms of Service</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/accessibility">Accessibility</Link> */}
            <Link href="mailto:tomas@getds.pro">tomas@getds.pro</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
