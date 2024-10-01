import {Component} from '@angular/core';
import {CounterComponent} from '../counter/counter.component';
import {ServiceCounterComponent} from '../service-counter/service-counter.component';
import {CounterService} from '../../services/counter.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CounterComponent,
    ServiceCounterComponent
  ],
  providers: [CounterService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public handleCountChange(count: number): void {
    console.log('countChange event from CounterComponent', count);
  }
}
