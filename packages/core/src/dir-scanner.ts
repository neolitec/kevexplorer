import fs from 'fs';
import path from 'path';

const fsp = fs.promises;

export enum FileType {
  FILE = 'FILE',
  DIR = 'DIR',
}

export interface FileMeta {
  fileName: string;
  path: string;
  size: number;
  type: FileType;
  children?: FileMeta[];
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

  await Promise.all(
    files.map(async (file) => {
      const filePath = path.resolve(dir, file);
      const stat = await fsp.stat(filePath);
      const fileMeta: FileMeta = {
        fileName: file,
        path: filePath,
        size: stat.size,
        type: FileType.FILE,
        lastModified: stat.mtime,
      };

      if (stat.isDirectory()) {
        fileMeta.children = await getDirContent(filePath);
        const lastModifiedInfo = getLastModifiedInfo(fileMeta.children);
        fileMeta.type = FileType.DIR;
        fileMeta.files = countByType(fileMeta.children, FileType.FILE);
        fileMeta.folders = countByType(fileMeta.children, FileType.DIR);
        fileMeta.lastModified = lastModifiedInfo.lastModified;
        fileMeta.lastModifiedFile = lastModifiedInfo.lastModifiedFile;
        fileMeta.size = getTotalCumulativeSize(fileMeta.children);
        fileMeta.cumul = {
          files: countByTypeCumul(fileMeta.children, FileType.FILE),
          folders: countByTypeCumul(fileMeta.children, FileType.DIR),
        };
      }

      dirContent.push(fileMeta);
    }),
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
