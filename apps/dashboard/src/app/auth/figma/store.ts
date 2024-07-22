/* eslint-disable @typescript-eslint/require-await -- These are server actions, it's required to be async */
'use server';

import { cookies } from 'next/headers';

const WRITE_KEY = 'figma.key';

export async function storeWriteKey(key: string): Promise<void> {
  cookies().set(WRITE_KEY, key, {
    maxAge: 5 * 60, // 5 minutes
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    expires: 5 * 60 * 1000, // 5 minutes
    path: '/',
  });
}

export async function getWriteKey(): Promise<string | undefined> {
  return cookies().get(WRITE_KEY)?.value;
}
