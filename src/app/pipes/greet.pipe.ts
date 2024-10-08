import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'greet',
  standalone: true
})
export class GreetPipe implements PipeTransform {
  transform(name: string): string {
    return `Hello, ${name}!`;
  }
}
