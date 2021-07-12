import { render } from '@testing-library/react';
import React from 'react';
import { Explorer } from './Explorer';
import { usePath } from './hooks/usePath';
import { ListResponse } from './model';

jest.mock('./hooks/usePath');

const LIST_RESULT: ListResponse['list'] = {
  files: [
    {
      isDir: false,
      lastModifiedDate: new Date(123).toISOString(),
      name: 'the-file',
      path: '/path/to/the-file',
      size: 1234,
    },
  ],
  filesCount: 1,
  foldersCount: 0,
  path: '/path/to',
  size: 1234,
};

describe(Explorer, () => {
  let setPath: jest.Mock;

  beforeEach(() => {
    setPath = jest.fn();
  });

  describe('when loading is true', () => {
    beforeEach(() => {
      (usePath as jest.Mock).mockReturnValue({
        setPath,
        loading: true,
      });
    });

    it('should not show the files list', async () => {
      const { queryByTestId } = render(<Explorer />);
      expect(queryByTestId('files-list')).toBeNull();
    });

    it('should show the loader', async () => {
      const { queryByTestId } = render(<Explorer />);
      expect(queryByTestId('loader')).toBeDefined();
    });
  });

  describe('when data is present', () => {
    beforeEach(() => {
      (usePath as jest.Mock).mockReturnValue({
        setPath,
        data: LIST_RESULT,
      });
    });

    it('should show the file', async () => {
      const { getByText } = render(<Explorer />);
      expect(getByText(LIST_RESULT.files[0].name)).toBeDefined();
    });
  });
});
