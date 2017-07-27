import { Component, Input } from '@angular/core';
import { Customer } from '../_models/index';

@Component({
    selector: 'customers',
    templateUrl: "./customers.component.html"
})
export class CustomersComponent {
    customers: Customer[] = [];
    constructor() {
        this.customers = [new Customer(1, "Alex Johns"), new Customer(2, "Bob Tompthson")]
    }
}