import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationSectionComponent } from './components/navigation-section/navigation-section.component';
import { HeaderSectionComponent } from './components/header-section/header-section.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationSectionComponent,
    HeaderSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
