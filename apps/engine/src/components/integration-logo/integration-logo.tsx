import type { LucideIcons } from '@ds-project/components';
import type { Icons } from '@ds-project/components';

interface IntegrationLogoProps {
  icon: typeof Icons.GitHubLogoIcon | typeof LucideIcons.GithubIcon;
}

export function IntegrationLogo({ icon: Icon }: IntegrationLogoProps) {
  return (
    <Icon
      width={54}
      height={54}
      className="border-4 border-double p-1 border-slate-200 rounded-md"
    />
  );
}
