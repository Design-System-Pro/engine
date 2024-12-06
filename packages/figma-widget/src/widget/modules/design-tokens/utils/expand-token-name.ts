type TokenDetails = {
  collectionName: string;
  modeName: string;
  tokenPath: string;
};

/**
 * Extracts the collection name, mode name, and token path from a token name.
 * eg: {collectionName.modeName.tokenPath}
 * tokenPath is the remaining path after the collection and mode names and is separated by a forward slash.
 * eg: {collectionName.modeName.tokenPath/remainingPath}
 */
export function expandTokenName(tokenName: string): TokenDetails {
  const [collectionName, modeName, ...tokenPath] = tokenName
    .replace(/{|}/g, '')
    .split('.');

  return {
    collectionName,
    modeName,
    tokenPath: tokenPath.join('/'),
  };
}
