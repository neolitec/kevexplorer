import React from 'react';
import styled from 'styled-components';
import { FilesList } from './components/FilesList/FilesList';
import { Loading } from './components/Loading';
import { PathInput } from './components/PathInput';
import { Topbar } from './components/Topbar';
import { Viewport } from './components/Viewport';
import { usePath } from './hooks/usePath';

const CenteredContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 1024px;
  // Hack: see https://moduscreate.com/blog/how-to-fix-overflow-issues-in-css-flex-layouts/
  min-height: 0px;
`;

const ListContainer = styled.div`
  flex: 1;
  overflow: auto;
  width: 100%;
  border-top: 1px solid #ccc;
`;

export const Explorer: React.FC = () => {
  const { setPath, data, loading } = usePath();

  const onChange = (newPath: string) => {
    setPath(newPath);
  };

  return (
    <Viewport>
      <Topbar />
      <CenteredContainer>
        <PathInput path={data?.path ?? ''} onChange={onChange} />
        {loading && <Loading />}
      </CenteredContainer>
      {!loading && (
        <ListContainer>
          <FilesList files={data?.files ?? []} path={data?.path ?? ''} onFolderClick={setPath} />
        </ListContainer>
      )}
    </Viewport>
  );
};
