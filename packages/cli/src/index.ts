import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { about, changeDirectory, clear, exit, help, list } from './commands';
import { printAbout } from './commands/about';
import { CLIContext } from './model';

const fsp = fs.promises;

const initialPath = process.cwd()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `${initialPath} > `,
});

const setPromptPath = (path: string) => {
  rl.setPrompt(`${path} > `);
};

const context: CLIContext = {
  path: initialPath,
  rl,
  async enterFolder(folder: string) {
    const newPath = path.join(this.path, folder);
    const stat = await fsp.stat(newPath);
    if (!stat.isDirectory()) {
      console.log(`${folder} is not a folder.`);
      return;
    }
    this.path = newPath;
    setPromptPath(this.path);
  },
  parentFolder() {
    this.path = path.dirname(this.path);
    setPromptPath(this.path);
  }
};

printAbout();

rl.prompt();

rl.on('line', async (line) => {
  const files = fs.readdirSync(context.path, 'utf8');
  const cleanLine = line.trim();
  const trigger = cleanLine.split(/\s/)[0];

  if (files.includes(cleanLine)) {
    await context.enterFolder(cleanLine);
  } else if (cleanLine === '..') {
    context.parentFolder();
  } else {
    const commandParams = { command: cleanLine, context, files, rl };

    switch (trigger) {
      case 'about':
        await about.run(commandParams);
        break;
      case 'help':
        await help.run(commandParams);
        break;
      case 'cd':
        await changeDirectory.run(commandParams);
        break;
      case 'clear':
        await clear.run(commandParams);
        break;
      case 'exit':
        await exit.run(commandParams);
        break;
      case 'ls':
        await list.run(commandParams);
        break;
      case '':
        break;
      default:
        console.log('Wut?');
        break;
    }
  }

  rl.prompt();
}).on('close', () => {
  process.exit(0);
});
