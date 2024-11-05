import type { LucideIcons } from '@ds-project/components/server';
import type { Icons } from '@ds-project/components/server';

interface IntegrationLogoProps {
  icon: typeof Icons.GitHubLogoIcon | typeof LucideIcons.GithubIcon;
}

export function IntegrationLogo({ icon: Icon }: IntegrationLogoProps) {
  return (
    <Icon
      width={54}
      height={54}
      className="rounded-md border-4 border-double border-slate-200 p-1"
    />
  );
}
