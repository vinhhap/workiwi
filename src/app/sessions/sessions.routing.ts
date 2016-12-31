import { LoginGuard } from './../shared/services/login.guard';
import { SessionsComponent } from './sessions.component';
import { Routes, RouterModule } from '@angular/router';

const SESSIONS_ROUTES: Routes = [
    { path: "login", component: SessionsComponent, canActivate: [LoginGuard] }
];

export const sessionsRouting = RouterModule.forChild(SESSIONS_ROUTES);