import { Injectable } from '@angular/core';
import { FirebaseAuth, FirebaseAuthState, AuthProviders, AuthMethods } from "angularfire2";
import { AuthInfo } from "./auth-info";
import { Router } from "@angular/router";

import { BehaviorSubject, Subject, Observable } from "rxjs/Rx";

@Injectable()
export class AuthService {
  
  static UNKNOWN_USER = new AuthInfo(null);

  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);

  constructor(private auth: FirebaseAuth,
              private router: Router
  ) { }

  loginEmail(email, password): Observable<FirebaseAuthState> {
    return this.fromFirebaseAuthPromise(this.auth.login({email, password}));
  }
  // loginGoogle(): Observable<FirebaseAuthState> {
  //   return this.fromFirebaseAuthPromise(this.auth.login({
  //     provider: AuthProviders.Google,
  //     method: AuthMethods.Popup,
  //   }));
  // }
  // loginFacebook(): Observable<FirebaseAuthState> {
  //   return this.fromFirebaseAuthPromise(this.auth.login({
  //     provider: AuthProviders.Facebook,
  //     method: AuthMethods.Popup,
  //   }));
  // }

  fromFirebaseAuthPromise(promise):Observable<any> {
    const subject = new Subject<any>();

    promise
      .then(res => {
        const authInfo = new AuthInfo(this.auth.getAuth().uid);
        this.authInfo$.next(authInfo);
        subject.next(res);
        subject.complete();
      },
      err => {
          this.authInfo$.error(err);
          subject.error(err);
          subject.complete();
      });

    return subject.asObservable();
  }

  logout() {
      this.auth.logout();
      this.authInfo$.next(AuthService.UNKNOWN_USER);
      this.router.navigate(['/jobs']);
  }
}
