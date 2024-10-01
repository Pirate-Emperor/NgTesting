import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ServiceCounterComponent} from './service-counter.component';
import {click, expectText, setFieldValue} from '../../spec-helpers';
import {CounterService} from '../../services/counter.service';
import {of} from 'rxjs';

describe('ServiceCounterComponent: integration test with fake service', () => {
  const currentCount = 123;

  let fixture: ComponentFixture<ServiceCounterComponent>;

  // Declare shared variable
  let fakeCounterService: CounterService;

  beforeEach(async () => {
    // Create fake
    fakeCounterService = jasmine.createSpyObj<CounterService>(
      'CounterService',
      {
        getCount: of(currentCount),
        increment: undefined,
        decrement: undefined,
        reset: undefined
      }
    );

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

  it('shows the count', () => {
    expectText(fixture, 'count', String(currentCount));
    expect(fakeCounterService.getCount).toHaveBeenCalled();
  });

  it('increments the count', () => {
    click(fixture, 'increment-button');
    expect(fakeCounterService.increment).toHaveBeenCalled();
  });

  it('decrements the count', () => {
    click(fixture, 'decrement-button');
    expect(fakeCounterService.decrement).toHaveBeenCalled();
  });

  it('resets the count', () => {
    const newCount = 456;
    setFieldValue(fixture, 'reset-input', String(newCount));
    click(fixture, 'reset-button');
    expect(fakeCounterService.reset).toHaveBeenCalledWith(newCount);
  });
});
