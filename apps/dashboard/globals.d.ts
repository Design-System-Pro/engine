declare module '*.svg' {
  import type { StaticImageData } from 'next/image';

  const content: StaticImageData;

  export default content;
}

declare global {
  namespace globalThis {
    // eslint-disable-next-line no-var
    var EdgeRuntime: string;
  }
}

export {};
