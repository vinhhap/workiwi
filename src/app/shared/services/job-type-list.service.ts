import { Injectable } from '@angular/core';

@Injectable()
export class JobTypeListService {

  constructor() { }

  get jobTypeName() {
    return [
      "fulltime",
      "parttime",
      "intern",
      // "coremember"
    ];
  }
}
