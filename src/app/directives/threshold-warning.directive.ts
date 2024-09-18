import {Directive, ElementRef, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appThresholdWarning]',
  standalone: true
})
export class ThresholdWarningDirective {

  @Input()
  public appThresholdWarning: number | null = null;

  @HostBinding('class.overThreshold')
  public overThreshold = false;

  @HostListener('input')
  public inputHandler(): void {
    this.overThreshold =
      this.appThresholdWarning !== null &&
      this.elementRef.nativeElement.valueAsNumber > this.appThresholdWarning;
  }

  constructor(private elementRef: ElementRef<HTMLInputElement>) {
  }

}
