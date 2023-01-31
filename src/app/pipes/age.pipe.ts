import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
  standalone: true,
})
export class AgePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    const [day, month, year] = value.split('/');

    const birth = new Date(Number(year), Number(month) - 1, Number(day));
    const now = new Date();
    const diff = new Date(now.valueOf() - birth.valueOf());
    return Math.abs(diff.getFullYear() - 1970);
  }
}
