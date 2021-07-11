import { ICommand } from '../model';

export default {
  name: 'cd',
  async run({ command, context }) {
    const folder = command.replace(/^cd\s*/, '');
    if (folder === '..') {
      context.parentFolder();
    } else if (folder.length) {
      await context.enterFolder(folder);
    }
  },
} as ICommand;
