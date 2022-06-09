import { Command } from 'commander';

import { prepare } from './commands/prepare';
import { upload } from './commands/upload';

const main = async (): Promise<void> => {
  const program = new Command();

  const prepareCmd = program.command('prepare');
  prepareCmd
    .argument('<tag>', 'tf module tag')
    .argument('<src>', 'tf module folder')
    .action(prepare);

  const uploadCmd = program.command('upload');
  uploadCmd
    .argument('<tag>', 'tf module tag')
    .argument('<file>', 'filename')
    .action(upload);

  program.parse(process.argv);
};

main();
