import { log } from '../utils/log';
import execa from 'execa';

export const upload = async (tag: string, file: string): Promise<void> => {
  log(`upload ${file} with tag ${tag}`);
  const { stdout } = await execa('curl', [
    '--header',
    `JOB-TOKEN: ${process.env.CI_JOB_TOKEN}`,
    '--upload-file',
    file,
    `${process.env.CI_API_V4_URL}/projects/${process.env.CI_PROJECT_ID}/packages/terraform/modules/${process.env.CI_PROJECT_NAME}/local/${tag}/file`,
  ]);
  log(stdout);
};
