import { Component, Input } from '@angular/core';
import { Shop, User } from '../_models/index';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})
export class NavigationBarComponent {
  showSearchBox: boolean = false;
  @Input() currentUser: User;
  @Input() currentShop: Shop;
  @Input() shops: Shop[];
  constructor() {
  }
}
