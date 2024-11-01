import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icons,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@ds-project/components';
import Link from 'next/link';
import { cn } from '@/lib/css';
import { HomeButton } from '../home-button';
import type { SelectProjects } from '@ds-project/database/schema';
import { AccountMenu } from '../../modules/app-layout/acocunt-menu';
import { config } from '@/config';

interface AppNavigationProps {
  className?: string;
  projects?: Pick<SelectProjects, 'id' | 'name'>[];
  email: string;
  showReleases?: boolean;
}

export function AppNavigation({
  className,
  projects,
  email,
  showReleases,
}: AppNavigationProps) {
  return (
    <nav
      className={cn(
        'flex w-full justify-between gap-2 border-b border-slate-200 bg-white pb-2 shadow-sm',
        className
      )}
    >
      <div className="flex w-full gap-2">
        <HomeButton />
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-md border border-[hsl(var(--input))] p-2">
            <Icons.FrameIcon /> {projects?.[0].name} <Icons.ChevronDownIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {projects?.map((project) => (
              <DropdownMenuItem key={project.id}>
                <Icons.FrameIcon className="mr-2" /> {project.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem
              aria-label="Soon you will be able to add new projects"
              disabled
              title="Coming Soon"
            >
              <Icons.PlusIcon className="mr-2" /> New Project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/app/integrations" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Integrations
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {showReleases ? (
              <NavigationMenuItem>
                <Link href="/app/releases" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Releases
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ) : null}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex gap-2">
        <Button variant="ghost" asChild>
          <Link href={config.feedbackUrl} target="_blank">
            Feedback <Icons.StarFilledIcon className="ml-2" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" title="GitHub" asChild>
          <Link href={config.githubUrl} target="_blank">
            <Icons.GitHubLogoIcon />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" title="Discord" asChild>
          <Link href={config.discordInviteUrl} target="_blank">
            <Icons.DiscordLogoIcon />
          </Link>
        </Button>
      </div>

      <div>
        <AccountMenu email={email} />
      </div>
    </nav>
  );
}
