import { format } from 'date-fns';
import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { FileIcon } from '../../../icons/FileIcon';
import { FolderIcon } from '../../../icons/FolderIcon';
import { File } from '../../model';

export interface FileRowProps {
  file: File;
  onClick: (file: File) => void;
}

type RowProps = { isDir: boolean };
const Row = styled.div`
  display: flex;
  padding: 0 20px;
  height: 48px;
  align-items: center;
  ${(p: RowProps) => p.isDir ? css`cursor: pointer;` : ''}

  &:hover {
    background-color: #ccc;
  }
`;

const CellIcon = styled.div`
  width: 48px;
`;

const CellSmall = styled.div`
  width: 10%;
  max-width: 100px;
`;

const CellMedium = styled.div`
  width: 30%;
  max-width: 200px;
`;

const CellFlex = styled.div`
  flex: 1;
`;

export const ParentFolderRow: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return <Row role="listitem" isDir={true} onClick={onClick}>
    <CellIcon></CellIcon>
    <CellFlex>..</CellFlex>
  </Row>
}

export const FileRow: React.FC<FileRowProps> = ({ file, onClick }) => {
  const onClickHandler = useCallback(() => {
    onClick(file);
  }, [onClick])

  return <Row role="listitem" isDir={file.isDir} onClick={file.isDir ? onClickHandler : undefined}>
    <CellIcon>{file.isDir ? <FolderIcon /> : <FileIcon />}</CellIcon>
    <CellFlex>{file.name}</CellFlex>
    <CellMedium>{format(new Date(file.lastModifiedDate), 'yyyy/MM/dd HH:mm:ss')}</CellMedium>
    <CellSmall>{file.size}</CellSmall>
    <CellSmall>{file.filesCount}</CellSmall>
    <CellSmall>{file.foldersCount}</CellSmall>
  </Row>
}