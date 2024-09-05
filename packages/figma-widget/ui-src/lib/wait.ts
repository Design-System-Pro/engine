export const wait = async (timeout: number) =>
  await new Promise((resolver) => setTimeout(resolver, timeout));
