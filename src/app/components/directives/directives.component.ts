import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ThresholdWarningDirective} from '../../directives/threshold-warning.directive';

@Component({
  selector: 'app-directives',
  standalone: true,
  imports: [
    ThresholdWarningDirective
  ],
  templateUrl: './directives.component.html',
  styleUrl: './directives.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DirectivesComponent {

}
