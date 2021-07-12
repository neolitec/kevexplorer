export function getFolder(path: string) {
  return path.replace(/\/[^/]+$/, '');
}

export function prettySize(size: number) {
  const units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB'];
  const scale = Math.floor(Math.log10(size) / 3);
  const unit = units[scale];
  return `${Math.round((size / 10 ** (scale * 3)) * 100) / 100} ${unit}`;
}
