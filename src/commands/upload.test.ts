import { createArguments } from './upload';

describe('prepare', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  it('should createArguments', () => {
    process.env.CI_JOB_TOKEN = 'my-token';
    process.env.CI_API_V4_URL = 'http://www.gvnn.it/api';
    process.env.CI_PROJECT_ID = '123';
    process.env.TF_MODULE_NAME = 'my-module';
    process.env.TF_MODULE_SYSTEM = 'the-cloud';

    expect(createArguments('v1.2.3', 'some/random/path/to/a/file')).toEqual([
      '--header',
      'JOB-TOKEN: my-token',
      '--upload-file',
      'some/random/path/to/a/file',
      'http://www.gvnn.it/api/projects/123/packages/terraform/modules/my-module/the-cloud/v1.2.3/file',
    ]);
  });

  it('should throw if no TF_MODULE_NAME', () => {
    process.env.CI_JOB_TOKEN = 'my-token';
    process.env.CI_API_V4_URL = 'http://www.gvnn.it/api';
    process.env.CI_PROJECT_ID = '123';

    expect(() =>
      createArguments('v1.2.3', 'some/random/path/to/a/file'),
    ).toThrow('Invalid TF_MODULE_NAME');
  });

  it('should throw if no TF_MODULE_SYSTEM', () => {
    process.env.CI_JOB_TOKEN = 'my-token';
    process.env.CI_API_V4_URL = 'http://www.gvnn.it/api';
    process.env.CI_PROJECT_ID = '123';
    process.env.TF_MODULE_NAME = 'my-module';

    expect(() =>
      createArguments('v1.2.3', 'some/random/path/to/a/file'),
    ).toThrow('Invalid TF_MODULE_SYSTEM');
  });
});
