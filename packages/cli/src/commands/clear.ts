import { ICommand } from '../model';

export default {
  name: 'clear',
  run() {
    console.clear();
  },
} as ICommand;
