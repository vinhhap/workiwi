import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jobTypeName'
})
export class JobTypePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) return value;

    switch(value) {
      case "fulltime":
        return "Full-time";
      case "parttime":
        return "Part-time";
      case "intern":
        return "Thực tập";
    }
  }

}
