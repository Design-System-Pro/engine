import type { ConfigData } from '@ds-project/figma-utilities';

declare global {
  interface Window {
    __SHOW_UI_DATA__: ConfigData;
  }
}

// This empty export is necessary to make this a module
export {};
