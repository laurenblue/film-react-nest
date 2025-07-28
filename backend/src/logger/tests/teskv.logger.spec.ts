import { TskvLogger } from "../tskv.logger";

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
    jest.clearAllMocks();
  });

  it('formats TSKV messages correctly without params', () => {
    const result = logger['format']('log', 'hello');
    expect(result).toBe('level=log\tmessage=hello');
  });

  it('formats TSKV messages correctly with params', () => {
    const result = logger['format']('warn', 'warn msg', { a: 1 });
    expect(result).toMatch(/^level=warn\tmessage=warn msg\tparams=\[.*\]$/);
  });

  it('calls console.warn', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation();
    logger.warn('something');
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('message=something'));
  });
});
