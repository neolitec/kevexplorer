import React from 'react';
import { Provider as UrqlProvider } from 'urql';
import { Explorer } from './Explorer/Explorer';
import { client } from './hooks/useBackend';

function App() {
  return (
    <UrqlProvider value={client}>
      <Explorer />
    </UrqlProvider>
  )
}

export default App
