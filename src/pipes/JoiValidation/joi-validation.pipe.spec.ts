import { JoiValidationPipe } from './joi-validation.pipe';

describe('JoiPipe', () => {
  it('should be defined', () => {
    expect(new JoiValidationPipe()).toBeDefined();
  });
});
