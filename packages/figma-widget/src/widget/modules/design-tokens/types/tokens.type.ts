import { config } from '../../../config';

export type ExtendedToken<T> = T & {
  $extensions?: {
    [config.extensionPluginKey]?: {
      scopes: VariableScope[];
    };
  };
};
