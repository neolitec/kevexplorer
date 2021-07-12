import { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { ListResponse } from '../model';

const ListQuery = `
  query ($path: String) {
    list (path: $path) {
      files {
        path
        name
        size
        lastModifiedDate
        filesCount
        foldersCount
        isDir
      }
      path
      filesCount
      foldersCount
      size
    }
  }
`

export const usePath = () => {
  const [path, setPath] = useState<string | null>(null);

  const [result, reexecute] = useQuery<ListResponse>({
    query: ListQuery,
    variables: { path }
  })

  useEffect(() => {
    reexecute();
  }, [path]);

  return {
    loading: result.fetching,
    data: result.data?.list,
    setPath,
    path
  }
}