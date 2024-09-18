import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CounterComponent} from './components/counter/counter.component';
import {ThemeColorsComponent} from './components/theme-colors/theme-colors.component';
import {HomeComponent} from './components/home/home.component';
import {ButtonsComponent} from './components/buttons/buttons.component';
import {DirectivesComponent} from './components/directives/directives.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CounterComponent, ThemeColorsComponent, HomeComponent, ButtonsComponent, DirectivesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'ng-testing';
}
