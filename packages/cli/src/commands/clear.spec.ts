import { CommandParams } from '../model';
import clear from './clear';

describe('Clear command', () => {
  let clearSpy: jest.SpyInstance;
  const params = {} as CommandParams;

  beforeEach(() => {
    clearSpy = jest.spyOn(global.console, 'clear');
  });

  it('should clear the console', () => {
    clear.run(params);
    expect(clearSpy).toHaveBeenCalledTimes(1);
  });
});
