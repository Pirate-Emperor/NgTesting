import {GreetPipe} from './greet.pipe';

describe('GreetPipe', () => {
  let pipe: GreetPipe;

  beforeEach(() => {
    pipe = new GreetPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('greet a name', () => {
    expect(pipe.transform('World')).toBe('Hello, World!');
  });
});
