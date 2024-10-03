import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ServiceCounterComponent} from './service-counter.component';
import {click, expectText, setFieldValue} from '../../spec-helpers';
import {CounterService} from '../../services/counter.service';

describe('ServiceCounterComponent: integration test', () => {
  let fixture: ComponentFixture<ServiceCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceCounterComponent],
      providers: [CounterService]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceCounterComponent);
    fixture.detectChanges();
  });

  it('shows the start count', () => {
    expectText(fixture, 'count', '0');
  });

  it('increments the count', () => {
    click(fixture, 'increment-button');
    fixture.detectChanges();
    expectText(fixture, 'count', '1');
  });

  it('decrements the count', () => {
    click(fixture, 'decrement-button');
    fixture.detectChanges();
    expectText(fixture, 'count', '-1');
  });

  it('resets the count', () => {
    const newCount = 456;
    setFieldValue(fixture, 'reset-input', String(newCount));
    click(fixture, 'reset-button');
    fixture.detectChanges();
    expectText(fixture, 'count', String(newCount));
  });
});
