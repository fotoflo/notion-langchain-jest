import { basicChat } from '../chat';

describe('initialCall', () => {
  it('should return some text from openai', async () => {
    const result = await basicChat('hello');

    console.log(result);

    expect(typeof result).toBe('string');
  }, 10000);
});
