import {Component, signal} from '@angular/core';
import {DisabledOnEmptyDirective} from '../../directives/disabled-on-empty.directive';

@Component({
  selector: 'app-buttons',
  standalone: true,
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss',
  imports: [
    DisabledOnEmptyDirective
  ]
})
export class ButtonsComponent {
  items = signal<number[]>([]);

  onClick() {
    alert('Hello World!');
  }

  onAddItem() {
    this.items.set([...this.items(), this.items().length]);
  }

  onRemoveItem() {
    this.items.set(this.items().slice(0, this.items().length - 1));
  }
}
