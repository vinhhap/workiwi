import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "./shared/guards/auth.guard";
import { LoginGuard } from "./shared/guards/login.guard";

const APP_ROUTES: Routes = [
    { path: "jobs", loadChildren: "app/jobs/jobs.module#JobsModule" },
    { path: "admin", loadChildren: "app/admin/admin.module#AdminModule" },
    { path: "login", loadChildren: "app/sessions/sessions.module#SessionsModule" },
    { path: "", redirectTo: "jobs", pathMatch: "full"},
    { path: '**', redirectTo: 'jobs' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);