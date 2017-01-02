import { LoginGuard } from './../shared/services/login.guard';
import { CommonModule } from '@angular/common';
import { sessionsRouting } from './sessions.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SessionsComponent } from './sessions.component';
import { NgModule } from '@angular/core';
import { Angulartics2Module } from 'angulartics2';

@NgModule({
    declarations: [
        SessionsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        sessionsRouting,
        Angulartics2Module.forChild()
    ],
    providers: [
        LoginGuard
    ]
})
export class SessionsModule {}