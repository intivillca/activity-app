export function splitFileName(filename: string): {
  name: string;
  extension: string;
} {
  if (!filename.includes(".")) {
    // No dot in filename, return the whole name and an empty extension
    return { name: filename, extension: "" };
  }

  const parts = filename.split(".");
  if (parts.length === 1) {
    // In case there's only one part, treat it as the name with no extension
    return { name: parts[0], extension: "" };
  }

  const extension = parts.pop() || ""; // Take the last part as extension
  const name = parts.join("."); // Join the rest as the name

  return { name, extension };
}
