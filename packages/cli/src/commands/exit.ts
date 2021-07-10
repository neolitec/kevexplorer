import { ICommand } from '../model';

export default {
  name: 'exit',
  run({ context: { rl } }) {
    console.log('Bye bye!');
    rl.close();
  },
} as ICommand;
