import { SeoService } from './../shared/services/seo.service';
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
  public errorLogin: boolean = false;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private seoService: SeoService
  ) {
    this.loginForm = fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
    seoService.setTitle('Đăng nhập | Workiwi | Trang tuyển dụng việc làm cho Start Up');
    seoService.setMetaDescription('Chuyên trang tuyển dụng việc làm dành cho các Start Up');
    seoService.setMetaRobots('None');
  }

  ngOnInit() {
  }

  onLoginEmail() {
    const formValue = this.loginForm.value;

    this.authService.loginEmail(formValue.email, formValue.password)
        .subscribe(
            () => this.router.navigate(['/admin']),
            err => this.errorLogin = !!err
        );
  }
}
