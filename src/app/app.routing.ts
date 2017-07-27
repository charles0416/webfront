import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { SigninComponent, RegisterComponent } from './signin/index';
import { DashboardComponent } from './dashboard/index';
import { OrdersComponent } from './orders/index';
import { CustomersComponent } from './customers/index';
import { ShopComponent } from './shop/index';
import { HelpComponent } from './help/index';
import { SettingsComponent } from './settings/index';
import { AuthGuard } from './_guards/auth.guard';

const appRoutes: Routes = [
    { path: '', component: SigninComponent, canActivate: [AuthGuard] },
    { path: 'signin', component: SigninComponent },
    { path: 'help', component: HelpComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'signout', component: SigninComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, outlet: 'main', pathMatch: 'full' },
            { path: 'orderlist', component: OrdersComponent, outlet: 'main', pathMatch: 'full' },
            { path: 'customers', component: CustomersComponent, outlet: 'main', pathMatch: 'full' },
            { path: 'settings', component: SettingsComponent, outlet: 'main', pathMatch: 'full' },
            { path: 'shop', component:ShopComponent, outlet: 'main', pathMatch: 'full' }
        ]
    },
    // otherwise redirect to home
    { path: '**', redirectTo: 'signin' }
];

export const routing = RouterModule.forRoot(appRoutes);