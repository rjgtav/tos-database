import { Pipe, PipeTransform } from '@angular/core';

const TIME_MINUTE: number = 60;
const TIME_HOUR: number = TIME_MINUTE * 60;
const TIME_DAY: number = TIME_HOUR * 24;

@Pipe({
  name: 'tosTime'
})
export class TimePipe implements PipeTransform {

  transform(value: any, args?: any): string {
    value = +value;

    let days = Math.floor(value / TIME_DAY);
    let hours = Math.floor(value % TIME_DAY / TIME_HOUR);
    let minutes = Math.floor(value % TIME_HOUR / TIME_MINUTE);
    let seconds = value % TIME_MINUTE;

    let result = [];
    if (days > 0) result.push(days + ' day' + (days > 1 ? 's' : ''));
    if (hours > 0) result.push(hours + ' hour' + (hours > 1 ? 's' : ''));
    if (minutes > 0) result.push(minutes + ' minute' + (minutes > 1 ? 's' : ''));
    if (seconds > 0) result.push(seconds + ' second' + (seconds > 1 ? 's' : ''));

    return result.join(' ');
  }

}
