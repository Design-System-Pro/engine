import { DSProIcon, Icons, Text } from '@ds-project/components';
import { Button } from '../button';
import { CommunityBanner } from '../banners/community-banner';
import { config } from '@/config';
import { Link } from './_components/link';

export function Footer() {
  return (
    <footer className="flex w-full">
      <div className="flex w-full bg-zinc-950 py-16 rounded-t-xl justify-center">
        <div className="w-full max-w-screen-lg flex flex-col gap-6 mx-4">
          <div className="flex w-full justify-between items-start gap-24">
            <div>
              <DSProIcon width={72} height={72} className="text-white" />
              <div className="flex gap-2">
                <Button asChild mode="dark" size="icon">
                  <Link href={config.githubUrl}>
                    <Icons.GitHubLogoIcon />
                  </Link>
                </Button>
                <Button asChild mode="dark" size="icon">
                  <Link href={config.discordInviteUrl}>
                    <Icons.DiscordLogoIcon />
                  </Link>
                </Button>
                <Button asChild mode="dark" size="icon">
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
