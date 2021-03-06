import React from 'react';
import styled from 'styled-components';
import { File } from '../../model';
import { FileRow, HeaderRow, ParentFolderRow } from './FileRow';
import { getFolder } from './utils';

export interface FilesListProps {
  files: File[];
  path: string;
  onFolderClick: (path: string) => void;
}

const List = styled.ul`
  padding: 0;
  margin: 10px 0;
`;

export const FilesList: React.FC<FilesListProps> = ({ files, path, onFolderClick }) => {
  const onFileRowClickHandler = (file: File) => {
    onFolderClick(file.path);
  };

  const onParentFolderClick = () => {
    onFolderClick(getFolder(path));
  };

  return (
    <>
      <List>
        <HeaderRow />
        <ParentFolderRow onClick={onParentFolderClick} />
        {files.map((file) => (
          <FileRow key={file.path} file={file} onClick={onFileRowClickHandler} />
        ))}
      </List>
    </>
  );
};
