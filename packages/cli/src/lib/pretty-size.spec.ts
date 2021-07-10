import prettySize from "./pretty-size";

describe(prettySize, () => {
  it('should convert to the most appropriate unit', () => {
    expect(prettySize(10000000)).toEqual('10 MB');
  })

  it('should not display useless decimals', () => {
    expect(prettySize(1000)).toEqual('1 kB');
  })

  it('should round with two decimal', () => {
    expect(prettySize(1234)).toEqual('1.23 kB');
  })
})