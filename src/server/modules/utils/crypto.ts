import { createHash } from 'crypto';

/**
 * SHA256 hash function.
 *
 * @param value - The value to hash.
 *
 * @returns The hashed value.
 *
 * @throws Error if the value is not a string.
 */
export function sha256(value: string): string {
  if (typeof value !== 'string' || !value) {
    throw new Error(`Invalid key provided to sha256 function: ${value}`);
  }

  const hash = createHash('sha256');
  return hash.update(value).digest('hex');
}
