import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 1.5em;
  font-weight: 100;
  text-align: center;
`

export const Loading: React.FC = () => {
  return (
    <Container>Loading...</Container>
  )
}