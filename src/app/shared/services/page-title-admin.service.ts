import { BehaviorSubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class PageTitleAdminService {

  pageTitle$: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor() { }

  changeTitle(title: string) {
    this.pageTitle$.next(title);
  }
}
