import type { ConfigData } from '@ds-project/figma-messaging';

declare global {
  interface Window {
    __SHOW_UI_DATA__: ConfigData;
  }
}

// This empty export is necessary to make this a module
export {};
