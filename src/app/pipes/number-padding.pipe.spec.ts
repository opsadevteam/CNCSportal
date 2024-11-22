import { NumberPaddingPipe } from './number-padding.pipe';

describe('NumberPaddingPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberPaddingPipe();
    expect(pipe).toBeTruthy();
  });
});
