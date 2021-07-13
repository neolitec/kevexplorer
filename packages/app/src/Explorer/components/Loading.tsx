import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
`;

const Title = styled.span`
  font-size: 1.5em;
  font-weight: 100;
`;

const Subtitle = styled.div`
  font-weight: 100;
`;

export const Loading: React.FC = () => (
  <Container>
    <Title>Loading...</Title>
    <Subtitle>This can take a while for big folders!</Subtitle>
  </Container>
);
