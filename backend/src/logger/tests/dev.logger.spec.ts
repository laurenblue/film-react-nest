import { DevLogger } from '../dev.logger';

describe('DevLogger', () => {
  let logger: DevLogger;

  beforeEach(() => {
    logger = new DevLogger();
    jest.clearAllMocks();
  });

  it('calls ConsoleLogger.log', () => {
    const spy = jest.spyOn(logger, 'log');
    logger.log('test log');
    expect(spy).toHaveBeenCalledWith('test log');
  });

  it('calls ConsoleLogger.error', () => {
    const spy = jest.spyOn(logger, 'error');
    logger.error('dev error');
    expect(spy).toHaveBeenCalledWith('dev error');
  });
});
