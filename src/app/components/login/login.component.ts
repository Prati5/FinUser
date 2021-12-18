import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/constants';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services/AuthService/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.form_builder.group({
    username: ['', [Validators.required, Validators.pattern(Constants.pattern.emailPattern), Validators.maxLength(100)]],
    password: ['', [Validators.required, Validators.maxLength(100)]]
  });

  constructor(private form_builder: FormBuilder,
    private redirect: Router,
    private authService: AuthenticationService,
    private _toasterService: ToastrService) { }

  ngOnInit(): void {
  }

  loginUser = (): void => {
    // tslint:disable-next-line: deprecation
    this.authService.loginUser(this.loginForm.value).subscribe((response: any) => {
      this._toasterService.success(Constants.messages.loggedIn);
      this.redirect.navigate(['dashboard']);
    }, (error: any) => {
      if (error.status === 400) {
        this._toasterService.error(Constants.messages.userNotExists);
      }
    });
  }
}
