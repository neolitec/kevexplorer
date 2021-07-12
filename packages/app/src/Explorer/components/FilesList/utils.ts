export function getFolder(path: string) {
  return path.replace(/[^\/]+$/, '');
}