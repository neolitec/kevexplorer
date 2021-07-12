import { getFolder } from './utils';

describe(getFolder, () => {
  it('should return the basename of the given path', () => {
    expect(getFolder('/path/to/parent/child')).toEqual('/path/to/parent');
  });

  it('should return the root when already at the root', () => {
    expect(getFolder('/')).toEqual('/');
  });
});
