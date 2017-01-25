import { Injectable } from '@angular/core';
import { FirebaseAuthState, AngularFire } from "angularfire2";
import { Router } from "@angular/router";

import { BehaviorSubject, Subject, Observable } from "rxjs/Rx";

@Injectable()
export class AuthService {

  auth: any;

  constructor(private router: Router,
              private af: AngularFire
  ) {
    this.auth = af.auth;
  }

  loginEmail(email, password): Observable<FirebaseAuthState> {
    return this.fromFirebaseAuthPromise(this.auth.login({email, password}));
  }

  fromFirebaseAuthPromise(promise):Observable<any> {
    const subject = new Subject<any>();

    promise
      .then(res => {
        subject.next(res);
        subject.complete();
      },
      err => {
          subject.error(err);
          subject.complete();
      });

    return subject.asObservable();
  }

  logout() {
      this.auth.logout();
      this.router.navigate(['/jobs']);
  }

  isLoggedIn(): Observable<FirebaseAuthState> {
    return this.af.auth;
  }
}
