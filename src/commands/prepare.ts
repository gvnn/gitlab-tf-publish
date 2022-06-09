import { log } from '../utils/log';

import execa from 'execa';

export const prepare = async (tag: string, src: string): Promise<void> => {
  log(`prepare ${tag} from ${src}`);
  const { stdout } = await execa('tar', [
    '-cvzf',
    `${process.env.CI_PROJECT_NAME || 'module'}-${tag}.tgz`,
    '-C',
    src,
    '.',
  ]);
  log(stdout);
};
