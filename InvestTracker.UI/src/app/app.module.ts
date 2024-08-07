import './shared/extensions/rxjs.extension';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationSectionComponent } from './core/components/navigation-section/navigation-section.component';
import { HeaderSectionComponent } from './core/components/header-section/header-section.component';
import { MaterialModule } from './shared/modules/material.module';
import { OffersModule } from './modules/offers/offers.module';
import { UsersModule } from './modules/users/users.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AccountsModule } from './modules/accounts/accounts.module';
import { StrategiesModule } from './modules/strategies/strategies.module';
import { PortfoliosModule } from './modules/portfolios/portfolios.module';
import { CalculatorsModule } from './modules/calculators/calculators.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { HomeModule } from './modules/home/home.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { DatePipe } from '@angular/common';
import { ErrorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';
import { UpdateAdvisorComponent } from './core/components/update-advisor/update-advisor.component';
import { DialogContainerModule } from './shared/components/dialog-container/dialog-container.module';

@NgModule({
  declarations: [
    AppComponent,
    NavigationSectionComponent,
    HeaderSectionComponent,
    UpdateAdvisorComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    OffersModule,
    UsersModule,
    AccountsModule,
    StrategiesModule,
    PortfoliosModule,
    CalculatorsModule,
    NotificationsModule,
    HomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DialogContainerModule
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
