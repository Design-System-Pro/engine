function parse<V = string>(value: unknown): V | null {
  return value as V;
}

function stringify<V = string>(value: V): string {
  return String(value);
}

export const storage = {
  get: async function get<V = string>(key: string): Promise<V | null> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- getAsync is not sure of what it returns
    const value = await figma.clientStorage.getAsync(key);
    return value ? parse<V>(value) : null;
  },

  set: async function set<V = string>(
    key: string,
    value: V | null
  ): Promise<void> {
    await figma.clientStorage.setAsync(key, value ? stringify(value) : null);
  },

  remove: async function remove(key: string): Promise<void> {
    await figma.clientStorage.deleteAsync(key);
  },
};
