import chalk from 'chalk';
import pkg from '../../package.json';
import { ICommand } from '../model';

export function printAbout() {
  console.log(`${chalk.keyword('orange')(`
   _   __           _____           _                     
  | | / /          |  ___|         | |                    
  | |/ /  _____   _| |____  ___ __ | | ___  _ __ ___ _ __ 
  |    \\ / _ \\ \\ / /  __\\ \\/ / '_ \\| |/ _ \\| '__/ _ \\ '__|
  | |\\  \\  __/\\ V /| |___>  <| |_) | | (_) | | |  __/ |   
  \\_| \\_/\\___| \\_/ \\____/_/\\_\\ .__/|_|\\___/|_|  \\___|_|   
                             | |                          
                             |_|`)} v${pkg.version}
  
  Type 'help' to start.
`);
}

export default {
  name: 'about',
  run() {
    printAbout();
  },
} as ICommand;
