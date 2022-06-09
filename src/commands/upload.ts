import { log } from '../utils/log';
import execa from 'execa';

export const createArguments = (tag: string, file: string) => {
  if (isEmpty(process.env.TF_MODULE_NAME)) {
    throw new Error('Invalid TF_MODULE_NAME');
  }

  if (isEmpty(process.env.TF_MODULE_SYSTEM)) {
    throw new Error('Invalid TF_MODULE_SYSTEM');
  }

  return [
    '--header',
    `JOB-TOKEN: ${process.env.CI_JOB_TOKEN}`,
    '--upload-file',
    file,
    `${process.env.CI_API_V4_URL}/projects/${process.env.CI_PROJECT_ID}/packages/terraform/modules/${process.env.TF_MODULE_NAME}/${process.env.TF_MODULE_SYSTEM}/${tag}/file`,
  ];
};

const isEmpty = (str?: string) =>
  !str || str.length === 0 || str === 'undefined';

export const upload = async (tag: string, file: string): Promise<void> => {
  log(`upload ${file} with tag ${tag}`);

  const { stdout } = await execa('curl', createArguments(tag, file));
  log(stdout);
};
