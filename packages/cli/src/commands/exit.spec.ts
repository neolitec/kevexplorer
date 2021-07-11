import { CommandParams } from '../model';
import exit from './exit';

describe('Exit command', () => {
  const params = {
    context: {
      rl: {
        close: jest.fn(),
      },
    },
  } as unknown as CommandParams;

  it('should close the readline handle', () => {
    exit.run(params);
    expect(params.context.rl.close).toHaveBeenCalledTimes(1);
  });
});
