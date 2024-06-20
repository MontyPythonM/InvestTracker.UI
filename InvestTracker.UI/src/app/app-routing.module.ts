import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessGuardService } from './core/services/access-guard.service';
import { Visibility } from './core/enums/visibility.enum';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule)},
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule) },
  { path: 'account', loadChildren: () => import('./modules/accounts/accounts.module').then((m) => m.AccountsModule) },
  { path: 'calculators', loadChildren: () => import('./modules/calculators/calculators.module').then((m) => m.CalculatorsModule) },
  { path: 'notifications', loadChildren: () => import('./modules/notifications/notifications.module').then((m) => m.NotificationsModule), canActivate: [AccessGuardService], data: { visibility: Visibility.LoggedInUsers } },
  { path: 'offers', loadChildren: () => import('./modules/offers/offers.module').then((m) => m.OffersModule) },
  { path: 'portfolios', loadChildren: () => import('./modules/portfolios/portfolios.module').then((m) => m.PortfoliosModule), canActivate: [AccessGuardService], data: { visibility: Visibility.LoggedInUsers } },
  { path: 'strategies', loadChildren: () => import('./modules/strategies/strategies.module').then((m) => m.StrategiesModule), canActivate: [AccessGuardService], data: { visibility: Visibility.LoggedInUsers } },
  { path: 'users', loadChildren: () => import('./modules/users/users.module').then((m) => m.UsersModule), canActivate: [AccessGuardService], data: { visibility: Visibility.Administrators } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
