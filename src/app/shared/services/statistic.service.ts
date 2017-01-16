import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { FirebaseRef } from "angularfire2";

@Injectable()
export class StatisticService {

  sdkDb: any;

  constructor(@Inject(FirebaseRef) fb) {
    this.sdkDb = fb.database();
  }

  totalJobsNum() {
    const subject = new Subject();

    this.sdkDb.ref("jobs")
              .once("value")
              .then(snapshot => {
                subject.next(snapshot.numChildren());
                subject.complete();
              });
    return subject.asObservable();
  }

  totalJobsNumByType(type: string) {
    const subject = new Subject();

    this.sdkDb.ref(`types/${type}`)
              .once("value")
              .then(snapshot => {
                subject.next(snapshot.numChildren());
                subject.complete();
              });
    return subject.asObservable();
  }

}
