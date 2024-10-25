import { Text } from '@ds-project/components';

export function SyncFigmaBanner() {
  return (
    <div className="flex flex-col gap-11 py-10 items-center w-full">
      <div className="w-full flex flex-col items-center gap-4">
        <Text size="2xl" weight="medium" align="center">
          <h2>Synchronize Figma Variables with GitHub</h2>
        </Text>
      </div>

      <div className="relative pb-[62.391681109185434%] h-0 w-full">
        <iframe
          title="DS Pro - Synchronize Figma Variables with GitHub"
          src="https://www.loom.com/embed/3b7d0f6092874932a606b2b9e163b3cf?sid=c6b978f0-a1f5-4d5d-899d-90089726304d"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full border-0 rounded-md"
        />
      </div>
    </div>
  );
}
