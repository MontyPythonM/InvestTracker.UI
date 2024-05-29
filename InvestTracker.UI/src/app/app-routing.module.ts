import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AccountComponent } from './pages/account/account.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { StrategiesComponent } from './pages/strategies/strategies.component';
import { PortfoliosComponent } from './pages/portfolios/portfolios.component';
import { CalculatorsComponent } from './pages/calculators/calculators.component';
import { UsersComponent } from './pages/users/users.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'strategies', component: StrategiesComponent },
  { path: 'portfolios', component: PortfoliosComponent },
  { path: 'offers', loadChildren: () => import('./pages/offers/offers.module').then((m) => m.OffersModule) },
  { path: 'calculators', component: CalculatorsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'account', component: AccountComponent },
  { path: 'users', loadChildren: () => import('./pages/users/users.module').then((m) => m.UsersModule) },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
