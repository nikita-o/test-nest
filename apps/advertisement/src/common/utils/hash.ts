import { createHash } from 'crypto';

export function getHash(text: string): string {
  return createHash('md5').update(text).digest('hex');
}
