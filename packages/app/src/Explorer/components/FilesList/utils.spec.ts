import { getFolder, prettySize } from './utils';

describe(getFolder, () => {
  it('should return the basename of the given path', () => {
    expect(getFolder('/path/to/parent/child')).toEqual('/path/to/parent');
  });

  it('should return the root when already at the root', () => {
    expect(getFolder('/')).toEqual('/');
  });

  it('should return the root when at the first level', () => {
    expect(getFolder('/app')).toEqual('/');
  });
});

describe(prettySize, () => {
  it('should convert to the most appropriate unit', () => {
    expect(prettySize(10000000)).toEqual('10 MB');
  });

  it('should not display useless decimals', () => {
    expect(prettySize(1000)).toEqual('1 kB');
  });

  it('should round with two decimal', () => {
    expect(prettySize(1234)).toEqual('1.23 kB');
  });

  it('should convert null size', () => {
    expect(prettySize(0)).toEqual('0 B');
  });
});
