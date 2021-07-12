import React from 'react';
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 60px;
    border-bottom: 1px #ccc solid;
`

export const Topbar: React.FC = () => {
  return <Container>
    <div>KevExplorer</div>
  </Container>
}