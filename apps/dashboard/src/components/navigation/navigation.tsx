import {
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
import type { SelectProjects } from '@/lib/drizzle/schema';
import { HomeButton } from '../home-button';

interface NavigationProps {
  className?: string;
  projects?: SelectProjects[];
}

export function Navigation({ className, projects }: NavigationProps) {
  return (
    <nav
      className={cn(
        'flex w-full justify-start gap-2 border-b border-slate-200 bg-white pb-2',
        className
      )}
    >
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
    </nav>
  );
}
