import { Component, Input } from '@angular/core';

import { Order } from '../_models/index';

@Component({
    selector: 'orders',
    templateUrl: './orders.component.html'
})
export class OrdersComponent {
    orders: Order[];
    constructor() {
        this.orders = [];
        for (var i = 0; i < 5; i++) {
            this.orders[i] = new Order();
            this.orders[i].amount = i * 100 + i;
        }
    }
}
