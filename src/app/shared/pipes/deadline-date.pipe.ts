import { Pipe, PipeTransform } from '@angular/core';

declare var moment: any;

@Pipe({
  name: 'deadlineDate'
})
export class DeadlineDatePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (!value) return value;

    let fuck = moment(value, "DD-MM-YYYY");
    let now = moment(moment().format("DD-MM-YY"), "DD-MM-YY");
    if(fuck.isSame(now)) {
      return "Hôm nay";
    } else if(fuck.isBefore(now)){
      return "Hết hạn";
    } else if(fuck.isAfter(now)) {
      return value;
    }
  }

}
