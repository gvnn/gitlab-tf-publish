import { createArguments } from './prepare';

describe('prepare', () => {
  it('should createArguments', () => {
    expect(createArguments('v1.2.3', 'some/random/path')).toEqual([
      '-cvzf',
      'module-v1.2.3.tgz',
      '-C',
      'some/random/path',
      '.',
    ]);
  });
});
