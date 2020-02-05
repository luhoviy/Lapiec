import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'month'
})
export class MonthPipe implements PipeTransform {
  monthArray: Array<string> = ['Січня','Лютого','Березня','Квітня','Травня','Червня','Липня','Серпня','Вересня','Жовтня','Листопада','Грудня']
  transform(value: string): any {
    let date = value.split(' ');
    return `${date[0]} ${this.monthArray[+date[1] - 1]} ${date[2]}`
}
}
