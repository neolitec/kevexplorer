import { Interface as ReadlineInterface } from 'readline';

export interface CLIContext {
  path: string;
  rl: ReadlineInterface;
  enterFolder: (path: string) => void;
  parentFolder: () => void;
}

export interface CommandParams {
  command: string;
  context: CLIContext;
}

export interface ICommand {
  name: string;
  run: (params: CommandParams) => void;
}
