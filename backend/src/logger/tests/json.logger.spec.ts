import { JsonLogger } from '../json.logger';

describe('JsonLogger', () => {
  let log;
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
    log = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    log.mockReset();
  });

  it('should log correct format', () => {
    logger.warn('hello', { a: 'b', c: 1 });
    expect(log).toBeCalledTimes(1);
    expect(log).toBeCalledWith(
      '{"level":"warn","message":"hello","optionalParams":[[{"a":"b","c":1}]]}',
    );
  });
});
