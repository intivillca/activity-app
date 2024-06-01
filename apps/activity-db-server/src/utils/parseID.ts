export function parseID(ID: string) {
  const parsed = parseInt(ID, 10);

  if (!isNaN(parsed) && parsed.toString() === ID && parsed > 0) {
    return parsed;
  }
  return false;
}
