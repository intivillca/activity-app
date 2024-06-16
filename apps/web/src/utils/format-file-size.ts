export function formatFileSize(sizeBytes: number): string {
  const units = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  if (!sizeBytes) {
    // A special case for empty files. I'm sure someone will try to
    // upload one, they always do that kind of stuff
    return "0B";
  }

  // Math.log is a natural logarithm, this will get it to base 1000
  const unitIndex = Math.floor(Math.log(sizeBytes) / Math.log(1000));
  const unit = units[unitIndex] || "WTF?";

  return (sizeBytes / 1000 ** unitIndex).toFixed(1) + unit;
}
