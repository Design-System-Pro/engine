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

interface NavigationProps {
  className?: string;
  projects?: Pick<SelectProjects, 'id' | 'name'>[];
}

export function Navigation({ className, projects }: NavigationProps) {
  return (
    <nav
      className={cn(
        'flex w-full justify-between gap-2 border-b border-slate-200 bg-white pb-2',
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
              <Link href="/tokens" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Tokens
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/integrations" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Integrations
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex gap-2">
        <Button variant="ghost" size="icon" title="GitHub">
          <Link href="https://github.com/Design-System-Project" target="_blank">
            <Icons.GitHubLogoIcon />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" title="Discord">
          <Link href="https://discord.gg/AKza6Mqr" target="_blank">
            <Icons.DiscordLogoIcon />
          </Link>
        </Button>
      </div>
    </nav>
  );
}
