import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService, AlertService } from '../_services/index';
import { User } from '../_models/user';

@Component({
    selector: 'register',
    templateUrl: './register.component.html'
})

export class RegisterComponent {
    @Input() user: User;
    repeatPassword: String = "";
    loading: boolean = false;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) {
        this.user = new User();
    }

    onSubmit(): void {
        this.loading = true;
        this.userService.register(this.user).subscribe(
            data => {
                localStorage.setItem('CURRENT_USER', JSON.stringify(data));
                this.router.navigate(['/signin']);
                this.loading = false;
            },
            error => {
                this.alertService.error(error.json() && error.json().message);
                this.loading = false;
            });
    }
}
