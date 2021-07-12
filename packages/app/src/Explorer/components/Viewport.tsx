import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useWindowSize } from '../hooks/useWindowSize';

export interface ViewportProps {
  children: React.ReactNode;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 600px;
  min-height: 600px;
`;

export const Viewport: React.FC<ViewportProps> = ({ children }) => {
  const windowSize = useWindowSize();

  const styles = useMemo(() => ({
    height: `${windowSize.height}px`,
    width: `${windowSize.width}px`,
  }), [windowSize]);

  return (
    <Container style={styles}>{children}</Container>
  );
}