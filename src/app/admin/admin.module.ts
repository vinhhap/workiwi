import { AuthGuard } from './../shared/services/auth.guard';
import { CommonModule } from '@angular/common';
import { adminRouting } from './admin.routing';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditJobComponent } from './edit-job/edit-job.component';
import { NewJobComponent } from './new-job/new-job.component';
import { JobFormAdminComponent } from './job-form-admin/job-form-admin.component';
import { JobsListAdminComponent } from './jobs-list-admin/jobs-list-admin.component';
import { NavbarAdminComponent } from './shared/navbar-admin.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { Angulartics2Module } from 'angulartics2';

@NgModule({
    declarations: [
        AdminComponent,
        NavbarAdminComponent,
        JobFormAdminComponent,
        JobsListAdminComponent,
        NewJobComponent,
        EditJobComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CKEditorModule,
        adminRouting,
        Angulartics2Module.forChild()
    ],
    providers: [
        AuthGuard
    ]
})
export class AdminModule {

}