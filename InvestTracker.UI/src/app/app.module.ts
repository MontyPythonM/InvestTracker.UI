import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationSectionComponent } from './components/navigation-section/navigation-section.component';
import { HeaderSectionComponent } from './components/header-section/header-section.component';
import { HomeComponent } from './pages/home/home.component';
import { MaterialModule } from './shared/modules/material.module';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { AccountComponent } from './pages/account/account.component';
import { StrategiesComponent } from './pages/strategies/strategies.component';
import { PortfoliosComponent } from './pages/portfolios/portfolios.component';
import { CalculatorsComponent } from './pages/calculators/calculators.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationSectionComponent,
    HeaderSectionComponent,
    HomeComponent,
    NotificationsComponent,
    AccountComponent,
    StrategiesComponent,
    PortfoliosComponent,
    CalculatorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
