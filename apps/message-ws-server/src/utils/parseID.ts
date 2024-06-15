export function parseID(ID: string | number) {
  let parsed = typeof ID === "number" ? ID : Number.NaN;
  if (typeof ID === "string") {
    parsed = parseInt(ID, 10);
  }

  if (!isNaN(parsed) && parsed.toString() === `${ID}` && parsed > 0) {
    return parsed;
  }
  return false;
}
