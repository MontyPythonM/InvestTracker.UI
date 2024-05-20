import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AccountComponent } from './pages/account/account.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { StrategiesComponent } from './pages/strategies/strategies.component';
import { PortfoliosComponent } from './pages/portfolios/portfolios.component';
import { CalculatorsComponent } from './pages/calculators/calculators.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'strategies', component: StrategiesComponent },
  { path: 'portfolios', component: PortfoliosComponent },
  { path: 'offers', loadChildren: () => import('./pages/offers/offers.module').then((m) => m.OffersModule) },
  { path: 'calculators', component: CalculatorsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'account', component: AccountComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
