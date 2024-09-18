import {CounterService} from './counter.service';
import {first} from 'rxjs';

describe('CounterService', () => {
  let counterService: CounterService;

  function expectCount(count: number): void {
    let actualCount: number | undefined;
    counterService.getCount()
      .pipe(first())
      .subscribe(value => {
        actualCount = value;
      });
    expect(actualCount).toBe(count);
  }

  beforeEach(() => {
    counterService = new CounterService();
  });

  it('returns the count', () => {
    expectCount(0);
  });

  it('increments the count', () => {
    counterService.increment();
    expectCount(1);
  });

  it('decrements the count', () => {
    counterService.decrement();
    expectCount(-1);
  });

  it('resets the count', () => {
    const newCount = 10;
    counterService.reset(newCount);
    expectCount(newCount);
  });
});
