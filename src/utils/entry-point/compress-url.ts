import { base58 } from "@scure/base";

const SIZE = 32; // 256 bits

export function encode(set: Set<string>): string {
  const bitmask = new Uint8Array(SIZE);

  for (const str of set) {
    const num = Number(str);

    if (num < 0 || num >= 256) continue;

    bitmask[num >> 3] |= 1 << (num & 7);
  }

  return base58.encode(bitmask);
}

export function decode(bitmaskStr: string): Set<string> {
  const bytes = base58.decode(bitmaskStr);

  // Ensure we always work with exactly 32 bytes
  const bitmask = new Uint8Array(SIZE);
  bitmask.set(bytes.subarray(0, SIZE));

  const set = new Set<string>();

  for (let i = 0; i < 256; i++) {
    if (bitmask[i >> 3] & (1 << (i & 7))) {
      set.add(String(i));
    }
  }

  return set;
}
