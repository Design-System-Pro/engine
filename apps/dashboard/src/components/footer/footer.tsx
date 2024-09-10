import { Icons, Text } from '@ds-project/components';
import Link from 'next/link';
import { Button } from '../button';
import { CommunityBanner } from '../banners/community-banner';

export function Footer() {
  return (
    <footer className="flex w-full">
      <div className="flex w-full bg-gray-950 py-16 rounded-t-xl justify-center">
        <div className="w-full max-w-screen-lg flex flex-col gap-6 mx-4">
          <CommunityBanner />
          <div className="flex gap-2">
            <Button asChild mode="dark" size="icon">
              <Link href="https://discord.gg/AKza6Mqr">
                <Icons.DiscordLogoIcon />
              </Link>
            </Button>
            <Button asChild mode="dark" size="icon">
              <Link href="https://www.linkedin.com/company/design-system-project">
                <Icons.LinkedInLogoIcon />
              </Link>
            </Button>
          </div>
          <hr className="border-t-gray-600" />
          <div className="flex justify-between">
            <Text className="text-gray-600">
              <p>Design System Project</p>
            </Text>
            <Link href="mailto:tomas@getds.pro">
              <Text className="text-gray-600">
                <p>tomas@getds.pro</p>
              </Text>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
