import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../shared/services/auth.service";

@Component({
  selector: 'jb-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.less']
})
export class SessionsComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router
  ) {
    this.loginForm = fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  ngOnInit() {
  }

  onLoginEmail() {
    const formValue = this.loginForm.value;

    this.authService.loginEmail(formValue.email, formValue.password)
        .subscribe(
            () => this.router.navigate(['/admin'])
        );
  }

  // onLoginGoogle() {
  //   this.authService.loginGoogle()
  //       .subscribe(
  //           () => this.router.navigate(['/admin'])
  //       );
  // }

  // onLoginFacebook() {
  //   this.authService.loginFacebook()
  //       .subscribe(
  //           () => this.router.navigate(['/admin'],)
  //       );
  // }
}
