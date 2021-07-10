import { ICommand } from '../model';

export default {
  name: 'help',
  run(_) {
    console.log(`
  Commands:
    help \t\t this help
    about \t\t about this app
    cd [folder] \t change directory
    exit \t\t quit
    ls \t\t\t list the files in the current folder
    .. \t\t\t go to the parent folder
    [folder] \t\t go to given folder
        `);
  },
} as ICommand;
