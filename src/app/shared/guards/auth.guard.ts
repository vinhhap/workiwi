import { auth } from 'firebase';
import {CanActivateChild, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild  {
    
    constructor(private authService:AuthService,
                private router:Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        return this.authService.isLoggedIn()
            .map(auth => !!auth)
            .take(1)
            .do(allowed => {
                if(!allowed) {
                    this.router.navigate(['/login']);
                }
            });
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        return this.canActivate(route, state);
    }
}