import { Component, Input } from '@angular/core';
import { User } from '../_models/index';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
    @Input() currentUser: User;
    constructor() {

    }
}