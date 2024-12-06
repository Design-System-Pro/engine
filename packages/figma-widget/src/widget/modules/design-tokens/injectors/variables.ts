import type { TokenNormalized } from '@terrazzo/token-tools';
import { injectColor } from './color';

export async function injectVariables(
  normalizedTokens: Record<string, TokenNormalized>
): Promise<void> {
  // Split normalized tokens into alias and core tokens
  const aliasTokens: Record<string, TokenNormalized> = {};

  for (const key in normalizedTokens) {
    const token = normalizedTokens[key];
    if (token.$value && typeof token.$value === 'string') {
      // Assign alias tokens to be injected later
      aliasTokens[key] = token;
    } else {
      // Inject core tokens immediately
      switch (token.$type) {
        case 'color':
          await injectColor(key, token);
          break;
        default:
          break;
      }
    }
  }

  for (const key in aliasTokens) {
    switch (aliasTokens[key].$type) {
      case 'color':
        await injectColor(key, aliasTokens[key]);
        break;
      default:
        break;
    }
  }
}
