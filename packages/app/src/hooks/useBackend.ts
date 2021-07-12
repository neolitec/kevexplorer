import { createClient } from 'urql';

export const client = createClient({
  url: 'http://localhost:8080/graphql'
});

export const useBackend = () => {
  // TODO: expose a function to update the authentication token.

  return { client };
}