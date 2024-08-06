import type { NextRequest } from 'next/server';
import { getUserAccount } from './get-user-account';

export async function getDesignSystemId(request?: NextRequest) {
  const account = await getUserAccount(request);

  if (!account) return;
  const designSystemId = account.designSystemId;
  return designSystemId;
}
