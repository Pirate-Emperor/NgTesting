import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ServiceCounterComponent} from './service-counter.component';
import {click, expectText, setFieldValue} from '../../spec-helpers';
import {CounterService} from '../../services/counter.service';
import {BehaviorSubject, Observable} from 'rxjs';

describe('ServiceCounterComponent: integration test with fake service v2', () => {
  const newCount = 123;

  let fixture: ComponentFixture<ServiceCounterComponent>;

  // Declare shared variable
  let fakeCounterService: Pick<CounterService, keyof CounterService>;
  let fakeCount$: BehaviorSubject<number>;

  beforeEach(async () => {
    // Create fake
    fakeCount$ = new BehaviorSubject(0);
    fakeCounterService = {
      getCount(): Observable<number> {
        return fakeCount$;
      },
      increment(): void {
        fakeCount$.next(1);
      },
      decrement(): void {
        fakeCount$.next(-1);
      },
      reset(): void {
        fakeCount$.next(Number(newCount));
      }
    };

    spyOn(fakeCounterService, 'getCount').and.callThrough();
    spyOn(fakeCounterService, 'increment').and.callThrough();
    spyOn(fakeCounterService, 'decrement').and.callThrough();
    spyOn(fakeCounterService, 'reset').and.callThrough();

    await TestBed.configureTestingModule({
      imports: [ServiceCounterComponent],
      // Use fake instead of original
      providers: [
        {provide: CounterService, useValue: fakeCounterService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceCounterComponent);
    fixture.detectChanges();
  });

  it('shows the start count', () => {
    expectText(fixture, 'count', '0');
    expect(fakeCounterService.getCount).toHaveBeenCalled();
  });

  it('increments the count', () => {
    click(fixture, 'increment-button');
    fakeCount$.next(1);
    fixture.detectChanges();

    expectText(fixture, 'count', '1');
    expect(fakeCounterService.increment).toHaveBeenCalled();
  });

  it('decrements the count', () => {
    click(fixture, 'decrement-button');
    fakeCount$.next(-1);
    fixture.detectChanges();

    expectText(fixture, 'count', '-1');
    expect(fakeCounterService.decrement).toHaveBeenCalled();
  });

  it('resets the count', () => {
    setFieldValue(fixture, 'reset-input', newCount.toString());
    click(fixture, 'reset-button');
    fixture.detectChanges();

    expectText(fixture, 'count', newCount.toString());
    expect(fakeCounterService.reset).toHaveBeenCalledWith(newCount);
  });
});
