import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService, AlertService } from '../_services/index';
import { User } from '../_models/index';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.css']
})
export class SigninComponent {
  @Input() user: User;
  @Input() rememberUser: boolean;
  loading: boolean = false;
  returnUrl: String;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) {
    if (window.localStorage.getItem("CURRENT_USER") != null) {
      this.user = JSON.parse(window.localStorage.getItem("CURRENT_USER"));
    } else {
      this.user = new User();
    }

    if (window.localStorage.getItem("REMEMBER_USER") != null) {
      this.rememberUser = window.localStorage.getItem("REMEMBER_USER") == 'TRUE';
    } else {
      this.rememberUser = false;
    }
  }

  onSubmit(): void {
    window.localStorage.removeItem('REMEMBER_USER');
    if (this.rememberUser) {
      window.localStorage.setItem("REMEMBER_USER", "TRUE");
    }

    this.loading = true;
    this.userService.signIn(this.user.email, this.user.password)
      .subscribe(
      data => {
        this.router.navigate(['/home']);
      },
      error => {
        this.alertService.error(error.json() && error.json().message);
        this.loading = false;
      });
  }
}
