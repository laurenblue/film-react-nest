import { JsonLogger } from '../json.logger';
describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
    jest.clearAllMocks();
  });

  it('formats messages correctly', () => {
    const formatted = logger['format']('log', 'msg', 1, 2);
    expect(JSON.parse(formatted)).toEqual({
      level: 'log',
      message: 'msg',
      params: [1, 2],
    });
  });

  it('calls console.log', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();
    logger.log('test');
    expect(spy).toHaveBeenCalled();
  });

  it('calls console.error', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    logger.error('err');
    expect(spy).toHaveBeenCalled();
  });
});
