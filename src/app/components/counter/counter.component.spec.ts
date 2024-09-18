import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CounterComponent} from './counter.component';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {click, expectText, setFieldValue} from '../../spec-helpers';
import {take, toArray} from 'rxjs';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('increments the count', () => {
    // Act: Click on the increment button
    const incrementButton = debugElement.query(By.css('[data-testid="increment-button"]'));
    incrementButton.triggerEventHandler('click');
    // Re-render the Component
    fixture.detectChanges();

    // Assert: Expect that the displayed count now reads “1”.
    const countOutput = debugElement.query(By.css('[data-testid="count"]'));
    expect(countOutput.nativeElement.textContent).toBe('1');
  });

  it('decrements the count', () => {
    // Act: Click on the decrement button
    click(fixture, 'decrement-button');
    // Re-render the Component
    fixture.detectChanges();

    // Assert: Expect that the displayed count now reads “-1”.
    expectText(fixture, 'count', '-1');
  });

  it('resets the count', () => {
    const newCount = '123';

    // Act
    setFieldValue(fixture, 'reset-input', newCount);
    click(fixture, 'reset-button');
    fixture.detectChanges();

    // Assert
    expectText(fixture, 'count', newCount);
  });

  it('does not reset if the value is not a number', () => {
    const startCount = '0';
    const value = 'not a number';

    // Act
    setFieldValue(fixture, 'reset-input', value);
    click(fixture, 'reset-button');
    fixture.detectChanges();

    // Assert
    expectText(fixture, 'count', startCount);
  });

  it('shows the default start count', () => {
    component.ngOnChanges();
    fixture.detectChanges();

    expectText(fixture, 'count', '0');
  });

  it('shows the start count', () => {
    component.startCount = 42;
    component.ngOnChanges();
    fixture.detectChanges();

    expectText(fixture, 'count', '42');
  });

  it('emits countChange events on increment', () => {
    // Arrange
    let actualCount: number | undefined;
    component.countChange.subscribe((count: number) => {
      actualCount = count;
    });

    // Act
    click(fixture, 'increment-button');

    // Assert
    expect(actualCount).toBe(1);
  });

  it('emits countChange events on decrement', () => {
    // Arrange
    let actualCount: number | undefined;
    component.countChange.subscribe((count: number) => {
      actualCount = count;
    });

    // Act
    click(fixture, 'decrement-button');

    // Assert
    expect(actualCount).toBe(-1);
  });

  it('emits countChange events on reset', () => {
    const newCount = 123;

    // Arrange
    let actualCount: number | undefined;
    component.countChange.subscribe((count: number) => {
      actualCount = count;
    });

    // Act
    setFieldValue(fixture, 'reset-input', newCount.toString());
    click(fixture, 'reset-button');

    // Assert
    expect(actualCount).toBe(newCount);
  });

  it('emits countChange events', () => {
    // Arrange
    const newCount = 123;

    // Capture all emitted values in an array
    let actualCounts: number[] | undefined;

    // Transform the Observable, then subscribe
    component.countChange.pipe(
      // Close the Observable after three values
      take(3),
      // Collect all values in an array
      toArray()
    ).subscribe((counts) => {
      actualCounts = counts;
    });

    // Act
    click(fixture, 'increment-button');
    click(fixture, 'decrement-button');
    setFieldValue(fixture, 'reset-input', String(newCount));
    click(fixture, 'reset-button');

    // Assert
    expect(actualCounts).toEqual([1, 0, newCount]);
  });
});
