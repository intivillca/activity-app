export function bigIntToInt(bigIntValue: BigInt): number {
  const MAX_SAFE_INTEGER = BigInt(Number.MAX_SAFE_INTEGER);
  const MIN_SAFE_INTEGER = BigInt(Number.MIN_SAFE_INTEGER);

  if (bigIntValue > MAX_SAFE_INTEGER || bigIntValue < MIN_SAFE_INTEGER) {
    return 0;
  }

  return Number(bigIntValue);
}
