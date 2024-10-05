import {ThresholdWarningDirective} from './threshold-warning.directive';
import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {findEl, setFieldValue} from '../spec-helpers';

@Component({
  standalone: true,
  imports: [
    ThresholdWarningDirective
  ],
  template: `
    <input type="number" [appThresholdWarning]="10" data-testid="input"/>
  `
})
class HostComponent {
}

describe('ThresholdWarningDirectiveDirective', () => {

  let fixture: ComponentFixture<HostComponent>;
  let component: HostComponent;
  let input: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HostComponent]
    });

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    input = findEl(fixture, 'input').nativeElement;
  });

  it('create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('does not set the class initially', () => {
    expect(input.classList.contains('overThreshold')).toBe(false);
  });

  it('adds the class if the number is over the threshold', () => {
    setFieldValue(fixture, 'input', '11');
    fixture.detectChanges();
    expect(input.classList.contains('overThreshold')).toBe(true);
  });

  it('removes the class if the number is at the threshold', () => {
    setFieldValue(fixture, 'input', '10');
    fixture.detectChanges();
    expect(input.classList.contains('overThreshold')).toBe(false);
  });
});
