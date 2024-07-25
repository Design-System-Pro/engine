/* eslint-disable @typescript-eslint/require-await -- These are server actions, it's required to be async */
'use server';

import { cookies } from 'next/headers';
import { config } from '@/config';

export async function storeWriteKey(key: string): Promise<void> {
  cookies().set(config.WRITE_KEY, key, {
    maxAge: 5 * 60, // 5 minutes
    // httpOnly: true,
    // secure: true,
    // sameSite: 'strict',
    expires: 5 * 60 * 1000, // 5 minutes
    // path: '/',
  });
}
