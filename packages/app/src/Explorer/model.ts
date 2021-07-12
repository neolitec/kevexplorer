export interface File {
  name: string;
  path: string;
  size: number;
  lastModifiedDate: string;
  filesCount?: number;
  foldersCount?: number;
  isDir: boolean;
}

export interface ListResponse {
  list: {
    files: File[];
    path: string;
    filesCount: number;
    foldersCount: number;
    size: number;
  };
}
