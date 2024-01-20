import { LoggerTowMiddleware } from './logger-tow.middleware';

describe('LoggerTowMiddleware', () => {
  it('should be defined', () => {
    expect(new LoggerTowMiddleware()).toBeDefined();
  });
});
