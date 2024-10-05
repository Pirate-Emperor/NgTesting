import {Directive, HostBinding, input, OnChanges} from '@angular/core';
import {isEmpty} from '../helpers';


@Directive({
  selector: '[appDisabledOnEmpty]',
  standalone: true
})
export class DisabledOnEmptyDirective<T> implements OnChanges {
  data = input<T | T[] | null>(null, {alias: 'appDisabledOnEmpty'});

  @HostBinding('disabled')
  disabled = false;

  @HostBinding('style.background-color')
  backgroundColor = '';

  @HostBinding('style.border')
  border = '';

  ngOnChanges() {
    const isDisabled = isEmpty(this.data());

    this.disabled = isDisabled;
    this.backgroundColor = isDisabled ? '' : 'green';
    this.border = isDisabled ? '' : '2px dashed red';
  }
}
