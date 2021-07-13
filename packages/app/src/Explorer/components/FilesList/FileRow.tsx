import { format } from 'date-fns';
import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { FileIcon } from '../../../icons/FileIcon';
import { FolderIcon } from '../../../icons/FolderIcon';
import { File } from '../../model';
import { prettySize } from './utils';

export interface FileRowProps {
  file: File;
  onClick?: (file: File) => void;
}

type RowProps = { bordered?: boolean; onClick?: unknown; header?: boolean };
const Row = styled.div`
  display: flex;
  padding: 0 20px;
  height: 48px;
  align-items: center;

  ${(p: RowProps) =>
    p.bordered
      ? css`
          border-bottom: 1px #ddd solid;
        `
      : ''}
  ${(p: RowProps) =>
    p.bordered
      ? css`
          font-weight: 100;
        `
      : ''}

  ${(p: RowProps) =>
    p.onClick
      ? css`
          cursor: pointer;

          &:hover {
            background-color: #ccc;
          }
        `
      : ''}
`;

const CellIcon = styled.div`
  width: 48px;
`;

const CellSmall = styled.div`
  width: 15%;
  max-width: 120px;

  @media (max-width: 800px) {
    display: none;
  }
}
`;

const CellMedium = styled.div`
  width: 30%;
  max-width: 200px;

  @media (max-width: 800px) {
    display: none;
  }
}
`;

const CellFlex = styled.div`
  flex: 1;
`;

export const HeaderRow: React.FC = () => (
  <Row role="listitem" bordered header>
    <CellIcon />
    <CellFlex>Filename</CellFlex>
    <CellMedium>Last updated</CellMedium>
    <CellSmall>Size</CellSmall>
    <CellSmall>Files count</CellSmall>
    <CellSmall>Folders count</CellSmall>
  </Row>
);

export const ParentFolderRow: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <Row role="listitem" onClick={onClick}>
    <CellIcon />
    <CellFlex>..</CellFlex>
  </Row>
);

export const FileRow: React.FC<FileRowProps> = ({ file, onClick }) => {
  const onClickHandler = useCallback(() => {
    onClick?.(file);
  }, [file, onClick]);

  return (
    <Row role="listitem" onClick={file.isDir ? onClickHandler : undefined}>
      <CellIcon>{file.isDir ? <FolderIcon /> : <FileIcon />}</CellIcon>
      <CellFlex>{file.name}</CellFlex>
      <CellMedium>{format(new Date(file.lastModifiedDate), 'yyyy/MM/dd HH:mm:ss')}</CellMedium>
      <CellSmall>{prettySize(file.size)}</CellSmall>
      <CellSmall>{file.filesCount}</CellSmall>
      <CellSmall>{file.foldersCount}</CellSmall>
    </Row>
  );
};
