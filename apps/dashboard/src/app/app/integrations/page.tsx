import { MainContent } from '@/components';
import { GithubProvider } from './providers/github/_components';
import { FigmaProvider } from './providers/figma/_components';
import {
  Icons,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from '@ds-project/components';

export default function Page() {
  return (
    <MainContent
      description="Authorize and manage integrations"
      title="Integrations"
    >
      <div className="flex flex-col gap-2"></div>
      <Tabs defaultValue="inputs">
        <TabsList>
          <TabsTrigger value="inputs">Inputs</TabsTrigger>
          <TabsTrigger value="outputs">Outputs</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>
        <TabsContent value="inputs">
          <FigmaProvider />
        </TabsContent>
        <TabsContent value="outputs">
          <GithubProvider />
        </TabsContent>
        <TabsContent value="monitoring">
          <div className=" flex items-center space-x-4 rounded-md border p-4 opacity-50">
            <Icons.DiscordLogoIcon height={54} width={54} />
            <div className="flex-1 space-y-1">
              <Text size="base" weight="medium">
                <h2>Discord</h2>
              </Text>
              <Text mood="muted" size="sm">
                <p>
                  Send notifications about changes, releases or issues with your
                  configuration.
                </p>
              </Text>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </MainContent>
  );
}
