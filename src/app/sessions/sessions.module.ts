import { LoginGuard } from './../shared/guards/login.guard';
import { CommonModule } from '@angular/common';
import { sessionsRouting } from './sessions.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SessionsComponent } from './sessions.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        SessionsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        sessionsRouting
    ],
    providers: [
        LoginGuard
    ]
})
export class SessionsModule {}