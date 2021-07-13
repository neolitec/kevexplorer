import { FileMeta, FileType, scanDir } from '@kevexplorer/core';
import Table from 'cli-table';
import path from 'path';
import prettySize from '../lib/pretty-size';
import { ICommand } from '../model';

export default {
  name: 'ls',
  async run({ context }) {
    console.time('Processed');
    const list = await scanDir(context.path);

    const table = buildTable();
    table.push(...list.children.map(buildLine));

    console.log(
      `${table.toString()}

Total size: ${prettySize(list.size)}
Files count: ${list.filesCount}
Folders count: ${list.foldersCount}`,
    );
    console.log();
    console.timeEnd('Processed');
  },
} as ICommand;

function buildLine(file: FileMeta) {
  return [
    file.type === FileType.DIR ? 'D' : '',
    path.basename(file.fileName),
    prettySize(file.size),
    file.lastModified.toISOString(),
    file.cumul ? file.cumul.files : '-',
    file.cumul ? file.cumul.folders : '-',
  ];
}

function buildTable() {
  return new Table({
    head: ['', 'Name', 'Size', 'Last modified', 'Files count', 'Folders count'],
  });
}
