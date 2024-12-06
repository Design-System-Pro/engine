import { Token } from '@terrazzo/token-tools';
import { config } from '../../../config';
import { ExtendedToken } from '../types/tokens.type';

export function assignScopes({
  variable,
  token,
}: {
  variable: Variable;
  token: ExtendedToken<Token>;
}): void {
  variable.scopes =
    token.$extensions?.[config.extensionPluginKey]?.scopes ?? [];
}
