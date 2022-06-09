import { Command } from 'commander';

import { prepare } from './commands/prepare';
import { upload } from './commands/upload';

const program = new Command();

const prepareCmd = program.command('prepare');
prepareCmd
  .description('Prepare a tar with contents of a module folder')
  .argument('<tag>', 'tf module tag')
  .argument('<src>', 'tf module folder')
  .action(prepare);

const uploadCmd = program.command('upload');
uploadCmd
  .description('Upload file to gilab tf project registry')
  .argument('<tag>', 'tf module tag')
  .argument('<file>', 'filename')
  .action(upload);

program.parse(process.argv);
