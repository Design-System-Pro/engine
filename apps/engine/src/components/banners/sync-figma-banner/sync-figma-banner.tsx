import { Text } from '@ds-project/components/server';

export function SyncFigmaBanner() {
  return (
    <div className="flex w-full flex-col items-center gap-11 py-10">
      <div className="flex w-full flex-col items-center gap-4">
        <Text size="2xl" weight="medium" align="center">
          <h2>Synchronize Figma Variables with GitHub</h2>
        </Text>
      </div>

      <div className="relative h-0 w-full pb-[62.391681109185434%]">
        <iframe
          title="DS Pro - Synchronize Figma Variables with GitHub"
          src="https://www.loom.com/embed/3b7d0f6092874932a606b2b9e163b3cf?sid=c6b978f0-a1f5-4d5d-899d-90089726304d"
          allowFullScreen
          className="absolute left-0 top-0 size-full rounded-md border-0"
        />
      </div>
    </div>
  );
}
