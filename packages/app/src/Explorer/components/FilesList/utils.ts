export function getFolder(path: string) {
  const parent = path.replace(/\/[^/]+$/, '');
  return parent || '/';
}

export function prettySize(size: number) {
  const units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB'];
  const scale = size ? Math.floor(Math.log10(size) / 3) : 0;
  const unit = units[scale];
  return `${Math.round((size / 10 ** (scale * 3)) * 100) / 100} ${unit}`;
}
