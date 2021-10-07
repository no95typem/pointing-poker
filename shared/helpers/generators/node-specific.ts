import * as crypto from 'crypto';

export function genUniqIdWithCrypto(busy?: string[]): string {
  const id = crypto.randomBytes(16).toString('hex');

  if (busy?.includes(id)) return genUniqIdWithCrypto(busy);

  return id;
}
