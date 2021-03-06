import Promise from 'bluebird';
import fs from 'fs';
import path from 'path';

const fsp = fs.promises;

const ignoredErrors = [
  // triggered when the item is a symlink
  'ENOENT',
  // triggered when there's an access issue
  'EACCES',
  'EPERM',
];

export enum FileType {
  FILE = 'FILE',
  DIR = 'DIR',
}

export interface FileMeta {
  fileName: string;
  path: string;
  size: number;
  type: FileType;
  folders?: number;
  files?: number;
  lastModified: Date;
  lastModifiedFile?: string;
  cumul?: {
    folders: number;
    files: number;
  };
}

type NonOptional<T> = {
  [K in keyof T]-?: T[K];
};

type FileMetaWithCumul = FileMeta & NonOptional<Pick<FileMeta, 'cumul'>>;

export function getTotalSize(files: FileMeta[]) {
  return files.reduce((size, file) => size + file.size, 0);
}

export function getTotalCumulativeSize(files: FileMeta[]) {
  return files.reduce((size, file) => size + file.size, 0);
}

export function countByType(files: FileMeta[], type: FileType) {
  return files.filter((file) => file.type === type).length;
}

export function countByTypeCumul(files: FileMeta[], type: FileType) {
  const current = countByType(files, type);
  const folderCumuls = files.filter((file): file is FileMetaWithCumul => !!file.cumul).map((file) => file.cumul);
  if (type === FileType.DIR) {
    return current + folderCumuls.reduce((acc, cumul) => acc + cumul.folders, 0);
  }
  return current + folderCumuls.reduce((acc, cumul) => acc + cumul.files, 0);
}

export function getLastModifiedInfo(files: FileMeta[]) {
  return files.reduce(
    (result, file) =>
      file.lastModified.getTime() > result.lastModified.getTime()
        ? { lastModified: file.lastModified, lastModifiedFile: file.path }
        : result,
    { lastModified: new Date(0), lastModifiedFile: undefined } as {
      lastModified: Date;
      lastModifiedFile: undefined | string;
    },
  );
}

export const getDirContent = async (dir: string) => {
  const files = await fsp.readdir(dir);
  const dirContent: FileMeta[] = [];

  await Promise.map(
    files,
    async (file) => {
      const filePath = path.resolve(dir, file);
      try {
        const stat = await fsp.stat(filePath, {});
        const fileMeta: FileMeta = {
          fileName: file,
          path: filePath,
          size: stat.size,
          type: FileType.FILE,
          lastModified: stat.mtime,
        };

        if (stat.isDirectory()) {
          const children = await getDirContent(filePath);
          const lastModifiedInfo = getLastModifiedInfo(children);
          fileMeta.type = FileType.DIR;
          fileMeta.files = countByType(children, FileType.FILE);
          fileMeta.folders = countByType(children, FileType.DIR);
          fileMeta.lastModified = lastModifiedInfo.lastModified;
          fileMeta.lastModifiedFile = lastModifiedInfo.lastModifiedFile;
          fileMeta.size = getTotalCumulativeSize(children);
          fileMeta.cumul = {
            files: countByTypeCumul(children, FileType.FILE),
            folders: countByTypeCumul(children, FileType.DIR),
          };
        }

        dirContent.push(fileMeta);
      } catch (err) {
        if (ignoredErrors.includes(err.code)) {
          dirContent.push({
            fileName: file,
            path: filePath,
            size: 0,
            lastModified: new Date(0),
            type: FileType.FILE,
          });
        } else {
          console.log(`An unexpected error occurred while reading ${filePath}`);
          console.log(err);
        }
      }
    },
    {
      // Better than Infinity but not ideal.
      concurrency: 4,
    },
  );

  return [...dirContent].sort((a, b) => b.size - a.size);
};

export const scanDir = async (dir: string) => {
  const dirContent = await getDirContent(dir);

  return {
    path: path.resolve(dir),
    children: dirContent,
    size: getTotalCumulativeSize(dirContent),
    foldersCount: countByTypeCumul(dirContent, FileType.DIR),
    filesCount: countByTypeCumul(dirContent, FileType.FILE),
  };
};
