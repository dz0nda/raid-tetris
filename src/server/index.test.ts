// index.test.ts

import { RedTetris } from './app';

jest.mock('./app');

describe('Server Entry Point', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an instance of RedTetris and call listen', () => {
    // Re-require the module to trigger top-level code execution
    require('./index');

    expect(RedTetris).toHaveBeenCalledWith('0.0.0.0', 3000);
    expect(RedTetris.prototype.listen as jest.Mock).toHaveBeenCalled();
  });
});
