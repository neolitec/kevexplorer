import { FileType, scanDir } from '@kevexplorer/core';
import { CommandParams } from '../model';
import list from './list';

jest.mock('@kevexplorer/core');

const MOCKED_RESULT = {
  children: [
    {
      fileName: 'file',
      lastModified: new Date(123),
      path: '/path/to/dir/file',
      size: 12345,
      type: FileType.FILE,
    },
  ],
  size: 12345,
  filesCount: 1,
  foldersCount: 0,
};

describe('List command', () => {
  const params = {
    context: {
      path: '/path/to/dir',
    },
  } as unknown as CommandParams;
  let logSpy: jest.SpyInstance;

  beforeEach(() => {
    (scanDir as jest.Mock).mockResolvedValue(MOCKED_RESULT);
    logSpy = jest.spyOn(global.console, 'log');
  });

  it('should scan the current folder', async () => {
    await list.run(params);
    expect(scanDir).toHaveBeenCalledTimes(1);
    expect(scanDir).toHaveBeenCalledWith(params.context.path);
  });

  it('should print the result to the output', async () => {
    await list.run(params);
    const logSpyArgs = logSpy.mock.calls[0];
    expect(logSpyArgs).toMatchInlineSnapshot(`
Array [
  "┌──────┬──────────┬──────────────────────────┬─────────────┬───────────────┐
│ Name │ Size     │ Last modified            │ Files count │ Folders count │
├──────┼──────────┼──────────────────────────┼─────────────┼───────────────┤
│ file │ 12.35 kB │ 1970-01-01T00:00:00.123Z │ -           │ -             │
└──────┴──────────┴──────────────────────────┴─────────────┴───────────────┘

Total size: 12.35 kB
Files count: 1
Folders count: 0",
]
`);
  });
});
